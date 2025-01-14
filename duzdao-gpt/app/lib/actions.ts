'use server';

export async function getMessages(conversationId: string) {
  const res = await fetch(process.env.URL + `/api/conversations/${conversationId}`, {method: "GET"})
  const result = await res.json();
  return result;
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
  return (await res.json()).newMessage;
}