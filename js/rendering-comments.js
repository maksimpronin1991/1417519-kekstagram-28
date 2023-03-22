
const createCommentList = function(commentArr) {
  const fragmentComments = document.createDocumentFragment();

  const createComment = ({avatar, name, message}) => {
    const comment = document.createElement('li');
    comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text">Да это фоташоп!!!!!!!!</p>';
    comment.classList.add('social__comment');

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    fragmentComments.appendChild(comment);
  };

  commentArr.forEach((element) => {
    createComment(element);
  });

  return fragmentComments;
};

export {createCommentList};

/*
const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text">Да это фоташоп!!!!!!!!</p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

fn createCommentList (element) {
  forERach(element.comments {
    createComment(element.comments)
  })
}

  <li class="social__comment">
      <img
          class="social__picture"
          src="{{аватар}}"
          alt="{{имя комментатора}}"
          width="35" height="35">
      <p class="social__text">{{текст комментария}}</p>
  </li>
*/
