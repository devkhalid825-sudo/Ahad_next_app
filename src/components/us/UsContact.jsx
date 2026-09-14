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

const UsContact = ({
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
      setStatus({ text: 'Please fix the highlighted fields.', cls: 'us-error' });
      return;
    }

    setStatus({ text: 'Sending your request...', cls: 'us-loading' });
    setIsSubmitting(true);

    try {
      const { status: httpStatus } = await apiCall('/contact/contact', 'POST', payload);
      if (httpStatus === 200) {
        form.reset();
        setErrors({});
        setStatus({ text: 'Thank you! Your message has been sent successfully.', cls: 'us-success' });
      } else {
        setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'us-error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: 'Something went wrong. Please try again or message us on WhatsApp.', cls: 'us-error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact">
      <div className="us-container">
        <div className="us-section-head-center">
          {badge && <div className="us-contact-badge">{badge}</div>}
          <span className="us-section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="us-contact-sub">{sub}</p>
        </div>

        <div className="us-contact-card">
          <form id="contactForm" className="us-contact-form" noValidate onSubmit={handleSubmit}>
            <div className="us-contact-grid">
              <div className="us-field">
                <label htmlFor="us_first_name">First Name</label>
                <input id="us_first_name" name="first_name" type="text" placeholder="James"
                  aria-invalid={errors.first_name ? 'true' : 'false'}
                  onChange={(e) => handleField('first_name', e.target.value)} />
                <small className="us-field-error" data-for="first_name">{errors.first_name || ''}</small>
              </div>
              <div className="us-field">
                <label htmlFor="us_last_name">Last Name</label>
                <input id="us_last_name" name="last_name" type="text" placeholder="Wilson"
                  aria-invalid={errors.last_name ? 'true' : 'false'}
                  onChange={(e) => handleField('last_name', e.target.value)} />
                <small className="us-field-error" data-for="last_name">{errors.last_name || ''}</small>
              </div>
              <div className="us-field us-field-full">
                <label htmlFor="us_email">Business Email</label>
                <input id="us_email" name="user_email" type="email" placeholder="james@yourbrand.com"
                  aria-invalid={errors.user_email ? 'true' : 'false'}
                  onChange={(e) => handleField('user_email', e.target.value)} />
                <small className="us-field-error" data-for="user_email">{errors.user_email || ''}</small>
              </div>
              <div className="us-field us-field-full">
                <label htmlFor="us_phone">Phone — for a faster reply</label>
                <input id="us_phone" name="user_phone" type="tel" placeholder="+1 630-297-0428"
                  aria-invalid={errors.user_phone ? 'true' : 'false'}
                  onChange={(e) => handleField('user_phone', e.target.value)} />
                <small className="us-field-error" data-for="user_phone">{errors.user_phone || ''}</small>
              </div>
              <div className="us-field us-field-full">
                <label htmlFor="us_interest">Service Required</label>
                <select id="us_interest" name="interest"
                  aria-invalid={errors.interest ? 'true' : 'false'}
                  onChange={(e) => handleField('interest', e.target.value)}>
                  <option value="">Select a service</option>
                  {servicesList.map((it) => <option key={it} value={it}>{it}</option>)}
                </select>
                <small className="us-field-error" data-for="interest">{errors.interest || ''}</small>
              </div>
              <div className="us-field us-field-full">
                <label htmlFor="us_message">Your Project Brief</label>
                <textarea id="us_message" name="message" rows="4" placeholder="Tell us what you're building — product type, target audience, platform, timeline, and any specific requirements for your US market…"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onChange={(e) => handleField('message', e.target.value)} />
                <small className="us-field-error" data-for="message">{errors.message || ''}</small>
              </div>
            </div>

            <div className="us-contact-submit">
              <button type="submit" className="us-btn us-btn-primary" id="us_submit" disabled={isSubmitting}>
                <FaPaperPlane style={{ marginRight: 8, verticalAlign: '-2px' }} />
                {isSubmitting ? 'Sending...' : 'Get a Free Estimate'}
              </button>
              <p className={`us-form-status ${status.cls}`} id="us_status" role="status">{status.text}</p>
              <p className="us-contact-trustline">
                <FaCheck className="us-trustband-check" /> 1 CT business day response &nbsp;·&nbsp;
                <FaCheck className="us-trustband-check" /> Free sample render available &nbsp;·&nbsp;
                <FaCheck className="us-trustband-check" /> No sales calls without permission
              </p>
            </div>
          </form>

          <div className="us-contact-direct">
            <p>Or reach out directly for a quicker response</p>
            <div className="us-cta-actions">
              <a href="https://wa.me/923471245257" className="us-btn us-btn-outline" target="_blank" rel="noopener"><FaWhatsapp style={{ marginRight: 6, verticalAlign: '-2px' }} /> Message on WhatsApp</a>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener"><SiCalendly style={{ marginRight: 6, verticalAlign: '-2px' }} /> Schedule an Intro Call</a>
            </div>
          </div>
        </div>

        <div className="us-addr-box">
          <span className="us-addr-flag"><FaMapMarkerAlt /></span>
          <p>
            <strong>Elipse Studio USA</strong> — Hanover Park, IL<br />
            <a href="tel:+16302970428">+1 630-297-0428</a> · <a href="mailto:info@elipsestudio.com">info@elipsestudio.com</a><br />
            CT business hours · USD pricing (Sales Tax included) · Free estimate in 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsContact;
