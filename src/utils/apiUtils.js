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
