import React from 'react';
const html = `google-site-verification: googlea1d97ae014823e39.html`;

export default function GoogleOauthRoute() {
  return (
    <React.Fragment dangerouslySetInnerHTML={{ __html: html }}></React.Fragment>
  );
}
