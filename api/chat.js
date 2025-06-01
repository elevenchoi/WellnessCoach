// api/chat.js

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "당신은 10년 경력의 피트니스 코치입니다. 사용자의 건강과 운동, 식단 고민을 상담해 주세요." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "GPT 응답이 없습니다.";
    res.status(200).json({ answer });

  } catch (error) {
    console.error("❌ GPT 호출 실패:", error);
    res.status(500).json({ error: "서버 에러 발생" });
  }
}
