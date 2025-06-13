async function loop1() {
  for (let i = 0; i < 1000; i++) {
    console.log(i);
  }
  return;
}

async function loop2() {
  for (const i of ['a', 'b', 'c', 'd']) {
    console.log(i);
  }
  return;
}

loop1();
loop2();