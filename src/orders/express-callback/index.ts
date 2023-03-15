import express from "express";

export default function makeExpressCallback(controller: any) {
  return (req: express.Request, res: express.Response) => {
    return controller(req, res);
  };
}
