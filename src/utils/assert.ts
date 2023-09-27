function assert(condition: unknown, errorMessage?: string): asserts condition {
  if (!condition) {
    console.log(condition);
    throw new Error(errorMessage || 'condition 조건이 true가 아닙니다.');
  }
}

export default assert;
