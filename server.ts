import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---
  
  // Ejemplo: Mercado Pago Create Preference
  app.post("/api/payments/create-preference", async (req, res) => {
    try {
      // Aquí iría la lógica de Mercado Pago SDK
      // const preference = await mp.preferences.create({ ... });
      res.json({ id: "sample-pref-id", init_point: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=..." });
    } catch (error) {
      res.status(500).json({ error: "Error al crear preferencia de pago" });
    }
  });

  // Webpay Return URL
  app.post("/api/payments/webpay-commit", async (req, res) => {
    // Transbank enviará el token aquí para confirmar el pago
    res.json({ status: "confirmed" });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
