import { Meta, StoryObj } from '@storybook/react';
 import { action } from '@storybook/addon-actions';

 import { Button } from './Button'; // 테스트 할 컴포넌트

 const meta: Meta<typeof Button> = { component: Button }

 export default meta; // export default를 해줘야 스토리 리스트에 뜬다.
 type Story = StoryObj<typeof Button>; // 스토리 정의

//  export const Click: Story = { // Button 컴포넌트 하위 테스트라고 보면 된다. Default라는 하위 테스트가 생긴다.
//    args: { 
//      // 컴포넌트를 실제 사용할때 전달해줘야하는 인자들을 넣어준다. 인자 값에 따른 컴포넌트 변화를 테스트 할 수 있다.
//      onClick: action('the Default Button clicked'),
//      label: 'button',
//    }
//  };

export const TypeOfButtonStyle: Story = {
  args: {
    
    // buttonStyle: {

    // }
  }
}

export const Test: Story = {
  args: {
     value: 'ttst'
   }
 }