'use client';

import { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt, FaCheck, FaPaperPlane } from '@/components/ui/Icons';
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

const AuContact = ({
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
      setStatus({ text: 'Please fix the highlighted fields.', cls: 'au-error' });
      return;
    }

    setStatus({ text: 'Sending your request...', cls: 'au-loading' });
    setIsSubmitting(true);

    try {
      const { status: httpStatus } = await apiCall('/contact/contact', 'POST', payload);
      if (httpStatus === 200) {
        form.reset();
        setErrors({});
        setStatus({ text: 'Thank you! Your message has been sent successfully.', cls: 'au-success' });
      } else {
        setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'au-error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'au-error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact">
      <div className="au-container">
        <div className="au-section-head-center">
          {badge && <div className="au-contact-badge">{badge}</div>}
          <span className="au-section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="au-contact-sub">{sub}</p>
        </div>

        <div className="au-contact-card">
          <form id="contactForm" className="au-contact-form" noValidate onSubmit={handleSubmit}>
            <div className="au-contact-grid">
              <div className="au-field">
                <label htmlFor="au_first_name">First Name</label>
                <input id="au_first_name" name="first_name" type="text" placeholder="James"
                  aria-invalid={errors.first_name ? 'true' : 'false'}
                  onChange={(e) => handleField('first_name', e.target.value)} />
                <small className="au-field-error" data-for="first_name">{errors.first_name || ''}</small>
              </div>
              <div className="au-field">
                <label htmlFor="au_last_name">Last Name</label>
                <input id="au_last_name" name="last_name" type="text" placeholder="Wilson"
                  aria-invalid={errors.last_name ? 'true' : 'false'}
                  onChange={(e) => handleField('last_name', e.target.value)} />
                <small className="au-field-error" data-for="last_name">{errors.last_name || ''}</small>
              </div>
              <div className="au-field au-field-full">
                <label htmlFor="au_email">Business Email</label>
                <input id="au_email" name="user_email" type="email" placeholder="james@yourbrand.com.au"
                  aria-invalid={errors.user_email ? 'true' : 'false'}
                  onChange={(e) => handleField('user_email', e.target.value)} />
                <small className="au-field-error" data-for="user_email">{errors.user_email || ''}</small>
              </div>
              <div className="au-field au-field-full">
                <label htmlFor="au_phone">Phone — for a faster reply</label>
                <input id="au_phone" name="user_phone" type="tel" placeholder="+61 2 XXXX XXXX"
                  aria-invalid={errors.user_phone ? 'true' : 'false'}
                  onChange={(e) => handleField('user_phone', e.target.value)} />
                <small className="au-field-error" data-for="user_phone">{errors.user_phone || ''}</small>
              </div>
              <div className="au-field au-field-full">
                <label htmlFor="au_interest">Service Required</label>
                <select id="au_interest" name="interest"
                  aria-invalid={errors.interest ? 'true' : 'false'}
                  onChange={(e) => handleField('interest', e.target.value)}>
                  <option value="">Select a service</option>
                  {servicesList.map((it) => <option key={it} value={it}>{it}</option>)}
                </select>
                <small className="au-field-error" data-for="interest">{errors.interest || ''}</small>
              </div>
              <div className="au-field au-field-full">
                <label htmlFor="au_message">Your Project Brief</label>
                <textarea id="au_message" name="message" rows="4" placeholder="Tell us what you're building — product type, target audience, platform, timeline, and any specific requirements for your Australian market…"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onChange={(e) => handleField('message', e.target.value)} />
                <small className="au-field-error" data-for="message">{errors.message || ''}</small>
              </div>
            </div>

            <div className="au-contact-submit">
              <button type="submit" className="au-btn au-btn-primary" id="au_submit" disabled={isSubmitting}>
                <FaPaperPlane style={{ marginRight: 8, verticalAlign: '-2px' }} />
                {isSubmitting ? 'Sending...' : 'Get a Free Estimate'}
              </button>
              <p className={`au-form-status ${status.cls}`} id="au_status" role="status">{status.text}</p>
              <p className="au-contact-trustline">
                <FaCheck className="au-trustband-check" /> 1 AEST business day response &nbsp;·&nbsp;
                <FaCheck className="au-trustband-check" /> Free sample render available &nbsp;·&nbsp;
                <FaCheck className="au-trustband-check" /> No sales calls without permission
              </p>
            </div>
          </form>

          <div className="au-contact-direct">
            <p>Or reach out directly for a quicker response</p>
            <div className="au-cta-actions">
              <a href="https://wa.me/923471245257" className="au-btn au-btn-outline" target="_blank" rel="noopener"><FaWhatsapp style={{ marginRight: 6, verticalAlign: '-2px' }} /> Message on WhatsApp</a>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="au-btn au-btn-outline" target="_blank" rel="noopener"><SiCalendly style={{ marginRight: 6, verticalAlign: '-2px' }} /> Schedule an Intro Call</a>
            </div>
          </div>
        </div>

        <div className="au-addr-box">
          <span className="au-addr-flag"><FaMapMarkerAlt /></span>
          <p>
            <strong>Elipse Studio Australia</strong> — Sydney, NSW &amp; Melbourne, VIC<br />
            <a href="mailto:info@elipsestudio.com">info@elipsestudio.com</a><br />
            AEST business hours · AUD pricing (GST included) · Free estimate in 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuContact;
