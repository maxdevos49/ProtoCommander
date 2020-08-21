import { IServiceCollection } from "./interfaces/IServiceCollection.js";
import { ServiceCollection } from "./ServiceCollection.js";

export class Injector {

    public static readonly serviceCollection: IServiceCollection = new ServiceCollection();

    /**
     * Attempts to resolve all of the dependencies of a constructor and then returns the instantiated object 
     * @param constructor The constructor to resolve.
     */
    public static resolve<T>(constructor: new (...args: any) => T): T {

        try {

            if (this.serviceCollection.hasInstance(constructor))
                return this.serviceCollection.getService(constructor);

            let tokens = Reflect.getMetadata("design:paramtypes", constructor) ?? [];
            let injections = tokens.map((token: any) => {

                if (this.serviceCollection.hasService(token))
                    return this.serviceCollection.getService(token);

                return Injector.resolve<any>(token);
            });

            return new constructor(...injections);
        } catch (err) {
            if (err.message.indexOf('is not a constructor') >= 0) {
                throw new TypeError("The constructor supplied is not constructable");
            } else {
                throw err;
            }
        }

        // if (ServiceCollection.isSingleton(target))
        //     return ServiceCollection.getService(target)

        // let tokens = Reflect.getMetadata("design:paramtypes", target) ?? [];
        // let injections = tokens.map((token: any) => {//resolve arguments

        //     if (ServiceCollection.hasService(token))
        //         return ServiceCollection.getService(token);

        //     return Injector.resolve<any>(token);
        // });

        // return new target(...injections);
    }

}