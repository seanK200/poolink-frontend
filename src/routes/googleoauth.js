import React from 'react';
const html = `google-site-verification: googlea1d97ae014823e39.html`;

export default function GoogleOauthRoute() {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
