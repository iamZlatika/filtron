import { Resend } from "resend";

import { createOrderRequestSchema } from "@/schemas/order-request.schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.MY_EMAIL_ADDRESS;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      email, // honeypot
    } = data;

    if (email) {
      return Response.json({ ok: true });
    }

    const schema = createOrderRequestSchema({
      form_error_vin: "Invalid VIN",
      form_error_name: "Name is required",
      form_error_phone: "Phone is required",
      form_error_phone_format: "Invalid phone format",
      form_error_problem: "Problem description is required",
    });

    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.message);
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const validatedData = validationResult.data;

    await resend.emails.send({
      from: "Site <onboarding@resend.dev>",
      to: [`${TO_EMAIL}`],
      subject: "Новая заявка с сайта",
      html: `
        <h3>Новая заявка</h3>
        <p><b>Имя:</b> ${validatedData.name || "Не указано"}</p>
        <p><b>Телефон:</b> ${validatedData.phone}</p>
        ${validatedData.vin ? `<p><b>VIN:</b> ${validatedData.vin}</p>` : ""}
        ${validatedData.brand ? `<p><b>Марка:</b> ${validatedData.brand}</p>` : ""}
        ${validatedData.model ? `<p><b>Модель:</b> ${validatedData.model}</p>` : ""}
        ${validatedData.year ? `<p><b>Год:</b> ${validatedData.year}</p>` : ""}
        <p><b>Запрос:</b></p>
        <p>${validatedData.problem}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Server error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
