export default function demoState(
  state = {
    viral: {},
    error: null,
    metadatadialog: null
  },
  action
) {
  console.log(action);
  const newstate = Object.assign({}, state, action.payload);
  return newstate;
}
