import React from 'react'
import { Form } from 'react-bootstrap'

const CourseSelect = ({course, onChange, courseId}) => {
  return (
    <>
      <Form.Select
        onChange={(e) => onChange(e.target.value)}
        value={courseId || 0}
      >
        {course.length > 0 ? (
          <>
            <option value={0}>코스를 선택해주세요</option>
            {course.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </>
        ) : (
          <option>코스가 없습니다.</option>
        )}
      </Form.Select>
    </>
  )
}

export default CourseSelect
