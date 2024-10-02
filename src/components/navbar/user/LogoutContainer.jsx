import React from 'react'
import CustomButton  from '../../common/CustomButton'

const LogoutContainer = () => {
  return (
    <>
      <CustomButton
        variant='link'
        innerText='로그아웃'
        onclick={() => console.log(`로그아웃 함수 넣어야 함`)}
      />
      <CustomButton
        variant='link'
        innerText='마이페이지'
        href='mypage'
        onclick={() => console.log(`마이페이지로 이동 넣어야 함`)}
      />
    </>
  )
}

export default LogoutContainer
