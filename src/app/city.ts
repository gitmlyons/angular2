export class City {
    public id: number;
    public name: string;

    public constructor(init?:Partial<City>) {
        Object.assign(this, init);
    }    
}