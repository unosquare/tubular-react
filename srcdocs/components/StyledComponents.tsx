import styled from '@material-ui/styles/styled';

const Code = (text: any) => <code>{text}</code>;

export const TextAsCode = styled(Code)(() => ({
    backgroundColor: '#F8F8FF',
    fontSize: 14,
}));
