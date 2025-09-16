import { injectable } from "tsyringe";
@injectable()
export class HelloService {
    async getHelloMessage() {
        return{
            message: "Hello Abhi"
        }
    }

}
