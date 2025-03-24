/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly JUDGEME_SHOP_DOMAIN: string;
    readonly JUDGEME_API_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }