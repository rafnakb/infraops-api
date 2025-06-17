import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// Types
type Feedback = {
  comment: string;
  author: string;
};

type Service = {
  id: number;
  name: string;
  status: string;
  tags?: string[];
  responsible?: string;
  logs: string[];
  feedbacks: Feedback[];
};

// Types for body and params
type ServiceBody = Omit<Service, "id" | "logs" | "feedbacks">;
type FeedbackBody = Feedback;
type ServiceParams = { id: string };

let services: Service[] = [];
let id = 1;

// List services
app.get("/services", (_req: Request, res: Response<Service[]>) => {
  res.json(services);
});

// Create service
app.post(
  "/services",
  (req: Request<{}, {}, ServiceBody>, res: Response<Service>) => {
    const { name, status, tags, responsible } = req.body;
    const service: Service = {
      id: id++,
      name,
      status,
      tags,
      responsible,
      logs: [],
      feedbacks: [],
    };
    services.push(service);
    res.status(201).json(service);
  }
);

// List logs and services
app.get(
  "/services/:id/logs",
  (
    req: Request<ServiceParams>,
    res: Response<string[] | { message: string }>
  ) => {
    const service = services.find((s) => s.id === Number(req.params.id));
    if (!service) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(service.logs);
  }
);

// Add feedback to one service
app.post(
  "/services/:id/feedback",
  (
    req: Request<ServiceParams, {}, FeedbackBody>,
    res: Response<{ ok: boolean } | { message: string }>
  ) => {
    const service = services.find((s) => s.id === Number(req.params.id));
    if (!service) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    const { comment, author } = req.body;
    const feedback: Feedback = { comment, author };
    service.feedbacks.push(feedback);
    res.status(201).json({ ok: true });
  }
);

// Healthcheck
app.get("/health", (_req: Request, res: Response<{ status: string }>) => {
  res.json({ status: "ok" });
});

export default app;
