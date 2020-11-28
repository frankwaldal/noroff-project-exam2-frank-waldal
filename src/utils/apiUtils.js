import { apiLoginCred } from '../constants/apiKeys';
import { BASE_API_URL } from '../constants/apiUrl';

export async function getApiToken() {
  return (await fetch(`${BASE_API_URL}/auth/local`, {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(apiLoginCred),
  })).json();
}

export async function login(loginCred) {
  return (await fetch(`${BASE_API_URL}/auth/local`, {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCred),
  })).json();
}

export async function validateLoginToken(token) {
  return (await fetch(`${BASE_API_URL}/logged-in`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json();
}

export async function getEstablishments(apiToken) {
  return (await fetch(`${BASE_API_URL}/establishments`, {
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function getSpecificEstablishment(apiToken, establishmentId) {
  return (await fetch(`${BASE_API_URL}/establishments/${establishmentId}`, {
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function updateSpesificEstablishment({ apiToken, establishmentId, payload }) {
  return (await fetch(`${BASE_API_URL}/establishments/${establishmentId}`, {
    method: 'put',
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })).json();
}

export async function postNewEstablishment({ apiToken, payload }) {
  return (await fetch(`${BASE_API_URL}/establishments`, {
    method: 'post',
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })).json();
}

export async function deleteSpecificEstablishment({ apiToken, establishmentId }) {
  return (await fetch(`${BASE_API_URL}/establishments/${establishmentId}`, {
    method: 'delete',
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function getContacts(apiToken) {
  return (await fetch(`${BASE_API_URL}/contacts`, {
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function postNewContact({ apiToken, payload }) {
  return (await fetch(`${BASE_API_URL}/contacts`, {
    method: 'post',
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })).json();
}

export async function deleteSpecificContact({ apiToken, contactId }) {
  return (await fetch(`${BASE_API_URL}/contacts/${contactId}`, {
    method: 'delete',
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function getEnquiries(apiToken) {
  return (await fetch(`${BASE_API_URL}/enquiries`, {
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}

export async function postNewEnquiry({ apiToken, payload }) {
   return (await fetch(`${BASE_API_URL}/enquiries`, {
     method: 'post',
     headers: {
       "Authorization": `Bearer ${apiToken}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify(payload),
   })).json();
 }

export async function deleteSpecificEnquiry({ apiToken, enquiryId }) {
  return (await fetch(`${BASE_API_URL}/enquiries/${enquiryId}`, {
    method: 'delete',
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })).json();
}
