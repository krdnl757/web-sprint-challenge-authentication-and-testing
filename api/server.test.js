describe('Basic Tests', () => {
  test('sanity', () => {
    expect(true).toBe(true);
  });

  test('addition works', () => {
    expect(2 + 2).toBe(4);
  });

  test('string contains substring', () => {
    expect('hello world').toContain('world');
  });
});
