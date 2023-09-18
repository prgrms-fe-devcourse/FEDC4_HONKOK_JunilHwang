# Toast 컴포넌트

- `React.Portal`을 사용합니다.
- `Context API`를 활용한 `Provider` 패턴을 사용합니다.

## 사용법

`useToast` 훅을 통해 Toast와 관련된 기능을 불러옵니다.

```tsx
const { 사용 메서드 } = useToast();
```

## 파일 역할

### ToastProvider

모든 토스트들을 렌더링하고 관리하는 역할을 합니다.

### ToastContainer

토스트를 배치하고 순서대로 렌더링하는 역할을 합니다.

### Toast

사용되는 토스트 컴포넌트입니다.
