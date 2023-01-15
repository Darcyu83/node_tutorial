function func1(callback) {
  console.log(`[ func1 ]::  : `);

  return callback();
}
const a = () => {
  console.log(`[ anonymous ]::  : `);
};
func1(a);
