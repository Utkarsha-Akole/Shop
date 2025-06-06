import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { customerName, mobileNumber, address, items, total, paymentMethod } = data

    // Create order details message
    const orderDetails = `
New Order Details

Customer Information:
Name: ${customerName}
Mobile: ${mobileNumber}
Address: ${address}

Order Items:
${items.map((item: any) => `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total Amount: $${total.toFixed(2)}
Payment Method: ${paymentMethod}
    `

    // Send email using EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_id',
        template_id: 'template_id',
        user_id: 'user_id',
        template_params: {
          to_email: 'utkarsha.akole99@gmail.com',
          from_name: 'Electronic Shop',
          subject: `New Order from ${customerName}`,
          message: orderDetails,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
} 