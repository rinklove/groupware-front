import { CKEditor } from "@ckeditor/ckeditor5-react";


const BoardDetail = ({ data }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <span>{data.createdAt}</span>
      <span>작성자 {data.writer}</span>
      <hr/>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default BoardDetail;