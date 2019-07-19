import Transformer, { GridRequest } from 'tubular-common';

const useLocalDataSource = (source: any[]) => {
    const getAllRecords = (request: GridRequest) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(Transformer.getResponse(request, source));
            } catch (error) {
                reject(error);
            }
        });
    };

    return [getAllRecords];
};

export default useLocalDataSource;
