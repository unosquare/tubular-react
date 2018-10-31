export default interface IDataGridProps {
    error?: string;
    refresh: () => Promise<any>;
}
