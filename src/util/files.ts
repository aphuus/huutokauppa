import { env } from "@/env";

export function getImageUrl(fileKey: string) {
  return `${env.NEXT_PUBLIC_CLOUDFLARE_R2_SUBDOMAIN}/${fileKey}`;
}
