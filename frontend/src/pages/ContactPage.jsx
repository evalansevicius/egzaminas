import React from 'react';

const ContactPage = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Mus rasite</h2>
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46085.3619536828!2d25.220391210381774!3d54.68704581711478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd94042c8b4ad5%3A0xa4be9c8ec9c7c100!2sVilnius%2C%20Lithuania!5e0!3m2!1sen!2slt!4v1698650123456!5m2!1sen!2slt"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div>
        <h2>Contact Details</h2>
        <p><strong>Phone:</strong> +370 (123) 456-789</p>
        <p><strong>Email:</strong> contact@yourbusiness.lt</p>
        <p><strong>Address:</strong> Gedimino pr. 1, Vilnius, Lithuania</p>
      </div>
    </div>
  );
};

export default ContactPage;
