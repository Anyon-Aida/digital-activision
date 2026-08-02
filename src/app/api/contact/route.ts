import { createContactHandler } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handleContactPost = createContactHandler();

export const POST = handleContactPost;
