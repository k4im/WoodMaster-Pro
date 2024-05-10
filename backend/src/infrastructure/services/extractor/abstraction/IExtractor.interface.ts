export default interface IExtractor<T, U> {
    process(data: T): Promise<U>;
}