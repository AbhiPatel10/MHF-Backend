import { HelloService } from "../../services/v1/hello.service";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class HelloController {
    constructor(
        @inject(HelloService) private readonly helloService: HelloService,
    ) { }

    getHelloController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const hello = await this.helloService.getHelloMessage();
            res.json(hello);
        } catch (error) {
            console.error('----- getHelloController Error:', error)
        }
    };
}