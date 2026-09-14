'use client';

import { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaCheck, FaPaperPlane } from '@/components/ui/Icons';
import { SiCalendly } from '@/components/ui/Icons';
import { apiCall } from '../../utils/api';
import { servicesList } from '../../data/servicesList';

const validators = {
  first_name: (v) => '',
  last_name: (v) => '',
  user_email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email' : ''),
  user_phone: (v) => (v && !/^\+?[\d\s\-()]{7,15}$/.test(v) ? 'Please enter a valid phone number' : ''),
  interest: (v) => '',
  message: (v) => '',
};

const UkContact = ({
  badge,
  eyebrow = 'Contact',
  title = 'Not ready for a full proposal?',
  sub = 'Get a free sample render or a ballpark estimate for your project — no commitment required.',
}) => {
  const [status, setStatus] = useState({ text: '', cls: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateValue(name, value) {
    return validators[name] ? validators[name](value) : '';
  }

  function handleField(name, value) {
    const err = validateValue(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {};
    const nextErrors = {};
    let valid = true;

    Array.from(form.elements).forEach((el) => {
      if (!el.name || el.type === 'submit') return;
      const val = el.value.trim();
      payload[el.name] = val;
      const err = validateValue(el.name, val);
      nextErrors[el.name] = err;
      if (err) valid = false;
    });
    setErrors(nextErrors);

    payload.user_name = `${payload.first_name || ''} ${payload.last_name || ''}`.trim();

    if (!valid) {
      setStatus({ text: 'Please fix the highlighted fields.', cls: 'uk-error' });
      return;
    }

    setStatus({ text: 'Sending your request...', cls: 'uk-loading' });
    setIsSubmitting(true);

    try {
      const { status: httpStatus } = await apiCall('/contact/contact', 'POST', payload);
      if (httpStatus === 200) {
        form.reset();
        setErrors({});
        setStatus({ text: 'Thank you! Your message has been sent successfully.', cls: 'uk-success' });
      } else {
        setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'uk-error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'uk-error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact">
      <div className="uk-container">
        <div className="uk-section-head-center">
          {badge && <div className="uk-contact-badge">{badge}</div>}
          <span className="uk-section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="uk-contact-sub">{sub}</p>
        </div>

        <div className="uk-contact-card">
          <form id="contactForm" className="uk-contact-form" noValidate onSubmit={handleSubmit}>
            <div className="uk-contact-grid">
              <div className="uk-field">
                <label htmlFor="uk_first_name">First Name</label>
                <input id="uk_first_name" name="first_name" type="text" placeholder="James"
                  aria-invalid={errors.first_name ? 'true' : 'false'}
                  onChange={(e) => handleField('first_name', e.target.value)} />
                <small className="uk-field-error" data-for="first_name">{errors.first_name || ''}</small>
              </div>
              <div className="uk-field">
                <label htmlFor="uk_last_name">Last Name</label>
                <input id="uk_last_name" name="last_name" type="text" placeholder="Whitfield"
                  aria-invalid={errors.last_name ? 'true' : 'false'}
                  onChange={(e) => handleField('last_name', e.target.value)} />
                <small className="uk-field-error" data-for="last_name">{errors.last_name || ''}</small>
              </div>
              <div className="uk-field uk-field-full">
                <label htmlFor="uk_email">Business Email</label>
                <input id="uk_email" name="user_email" type="email" placeholder="james@yourbrand.co.uk"
                  aria-invalid={errors.user_email ? 'true' : 'false'}
                  onChange={(e) => handleField('user_email', e.target.value)} />
                <small className="uk-field-error" data-for="user_email">{errors.user_email || ''}</small>
              </div>
              <div className="uk-field uk-field-full">
                <label htmlFor="uk_phone">Phone — for a faster reply</label>
                <input id="uk_phone" name="user_phone" type="tel" placeholder="+44 20 XXXX XXXX"
                  aria-invalid={errors.user_phone ? 'true' : 'false'}
                  onChange={(e) => handleField('user_phone', e.target.value)} />
                <small className="uk-field-error" data-for="user_phone">{errors.user_phone || ''}</small>
              </div>
              <div className="uk-field uk-field-full">
                <label htmlFor="uk_interest">Service Required</label>
                <select id="uk_interest" name="interest"
                  aria-invalid={errors.interest ? 'true' : 'false'}
                  onChange={(e) => handleField('interest', e.target.value)}>
                  <option value="">Select a service</option>
                  {servicesList.map((it) => <option key={it} value={it}>{it}</option>)}
                </select>
                <small className="uk-field-error" data-for="interest">{errors.interest || ''}</small>
              </div>
              <div className="uk-field uk-field-full">
                <label htmlFor="uk_message">Your Project Brief</label>
                <textarea id="uk_message" name="message" rows="4" placeholder="Tell us what you're building — product type, target audience, platform, timeline, and any specific requirements for your UK market…"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onChange={(e) => handleField('message', e.target.value)} />
                <small className="uk-field-error" data-for="message">{errors.message || ''}</small>
              </div>
            </div>

            <div className="uk-contact-submit">
              <button type="submit" className="uk-btn uk-btn-primary" id="uk_submit" disabled={isSubmitting}>
                <FaPaperPlane style={{ marginRight: 8, verticalAlign: '-2px' }} />
                {isSubmitting ? 'Sending...' : 'Get a Free Estimate'}
              </button>
              <p className={`uk-form-status ${status.cls}`} id="uk_status" role="status">{status.text}</p>
              <p className="uk-contact-trustline">
                <FaCheck className="uk-trustband-check" /> 1 UK business day response &nbsp;·&nbsp;
                <FaCheck className="uk-trustband-check" /> Free sample render available &nbsp;·&nbsp;
                <FaCheck className="uk-trustband-check" /> No sales calls without permission
              </p>
            </div>
          </form>

          <div className="uk-contact-direct">
            <p>Or reach out directly for a quicker response</p>
            <div className="uk-cta-actions">
              <a href="https://wa.me/923471245257" className="uk-btn uk-btn-outline" target="_blank" rel="noopener"><FaWhatsapp style={{ marginRight: 6, verticalAlign: '-2px' }} /> Message on WhatsApp</a>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener"><SiCalendly style={{ marginRight: 6, verticalAlign: '-2px' }} /> Schedule an Intro Call</a>
              <a href="tel:+442046343117" className="uk-btn uk-btn-outline"><FaPhoneAlt style={{ marginRight: 6, verticalAlign: '-2px' }} /> Call UK: +44 20 4634 3117</a>
            </div>
          </div>
        </div>

        <div className="uk-addr-box">
          <span className="uk-addr-flag"><FaMapMarkerAlt /></span>
          <p>
            <strong>Elipse Studio UK</strong> — London, United Kingdom<br />
            <a href="tel:+442046343117">+44 20 4634 3117</a> · <a href="mailto:info@elipsestudio.com">info@elipsestudio.com</a><br />
            GMT business hours · VAT-inclusive quoting · Free estimate in 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default UkContact;
