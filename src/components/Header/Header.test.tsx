import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('헤더', () => {  
  it('"사진"이라는 li를 클릭할 경우 "/photo"경로로 이동한다.', async () => {
    const { container } = await render(<Header />);
    await container.click(screen.getByText('사진'));
  })
})