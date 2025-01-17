'use server';

export async function getConversations(userId: string) {
  const res = await fetch(process.env.URL + "/api/conversations", {
    method: "GET",
    headers: {
      "userId": userId
    }
  })

  if (res.ok) {
    const result = await res.json();
    return result;
  }
}

export async function getMessages(conversationId: string) {
  const res = await fetch(process.env.URL + `/api/conversations/${conversationId}`, {method: "GET"})
  if (res.ok) {
    const result = await res.json();
    return result;
  } 
}

export async function appendNewMessageFromUser(conversationId: string, userMessage: string) {
  const res = await fetch(process.env.URL + `/api/conversations/${conversationId}`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: userMessage
    })
  })

  return await res.json();
}

export async function createNewUser(username: string, email: string, password: string) {
  const res = await fetch(process.env.URL + "/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password
    })
  })

  return await res.json();
}