export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const body=req.body||{};
  const message=typeof body.message==="string"?body.message.trim():"";
  if(!message) return res.status(400).json({error:"Message is required"});
  if(message.length>1200) return res.status(400).json({error:"Message is too long"});
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:"AI support is not configured"});
  try{
    const r=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
      body:JSON.stringify({
        model:process.env.MORAA_AI_MODEL||"gpt-5.6-luna",
        instructions:"You are the Moraa Beauty Parlour website assistant. Be warm, concise and polished. Help with services, booking, opening hours and general salon enquiries. Known details: Nairobi, Kenya; Monday-Saturday, 9:00 AM-7:00 PM. Do not invent prices, phone numbers, availability, promotions, policies or addresses. When a detail is unknown, tell the visitor to enquire with the Moraa team. Never claim a booking is confirmed. Encourage the visitor to use the booking form or WhatsApp for confirmation.",
        input:message,
        max_output_tokens:250
      })
    });
    const data=await r.json();
    if(!r.ok) return res.status(502).json({error:"AI support temporarily unavailable"});
    return res.status(200).json({answer:data.output_text||"Please use the booking or enquiry options to reach the Moraa team."});
  }catch(e){
    return res.status(500).json({error:"Support temporarily unavailable"});
  }
}