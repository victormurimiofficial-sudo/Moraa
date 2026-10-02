# Moraa Beauty Parlour — Owner Handoff

## Brand
**Moraa Beauty Parlour**
**Positioning:** Beauty, Refined.
**Tone:** warm, elegant, confident, modern and human.

## Core website copy
**Hero:** Beauty, Refined.
**Supporting line:** Where elegance meets exceptional beauty care.

**About:**
Moraa Beauty Parlour is a modern beauty destination where thoughtful service, polished finishing and a calm atmosphere come together. Every visit is designed to feel personal, considered and beautifully easy.

**Brand promise:**
Small details. Beautiful difference.

**Closing CTA:**
Come in. Leave refined.

## Services currently presented
- Hair & Styling
- Braiding
- Nails
- Lashes
- Makeup
- Brows
- Facials & Skincare

Prices are intentionally not published as fixed figures until the salon approves the live price list.

## Booking
The booking form collects name, phone, email, service, preferred date, preferred time and notes. Submission prepares the complete request for WhatsApp.

## Enquiries
The contact page has a dedicated enquiry form. It prepares the visitor's name, phone number and enquiry message for WhatsApp.

## Moraa Beauty Assistant
The website includes a polished support assistant. It answers common questions about services, booking and opening hours from approved site information. When an OpenAI API key is configured in Vercel, `/api/support` provides AI responses. Without the key, the assistant safely falls back to built-in answers instead of breaking.

Required Vercel environment variable: `OPENAI_API_KEY`
Optional: `MORAA_AI_MODEL`

## WhatsApp
The website has one centralized WhatsApp configuration inside `script.js`: `WHATSAPP_NUMBER`. It is intentionally blank because no verified Moraa WhatsApp number was supplied in the available project information. Insert the exact salon number before public launch.

## Owner approval before public launch
1. Exact WhatsApp number.
2. Exact physical salon address / Google Maps link.
3. Approved phone and email.
4. Final service list and prices.
5. Real approved client reviews.
6. Actual shop inventory, if the Shop page remains public.
7. Exact business hours if different from the current presentation.

## Technical
- Static HTML/CSS/JS.
- Vercel clean URLs.
- Responsive mobile/desktop layouts.
- Accessible mobile navigation.
- Gallery lightbox.
- FAQ accordion.
- Booking validation.
- WhatsApp enquiry/booking handoff.
- Moraa Beauty Assistant with AI endpoint and safe fallback.
- Branded 404.
- SEO metadata.
- Lazy-loaded imagery.
- Reduced-motion support.