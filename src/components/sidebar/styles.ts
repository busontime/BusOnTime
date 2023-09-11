import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'cyan',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: -5,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    display: 'flex',
    paddingLeft: 30,
    gap: 15,
    marginVertical: 15,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'black',
  },
});
