import { useCallback } from "react";
import { useHistory } from "react-router-dom";

function useGoToPage() {
  const history = useHistory();

  const goToMain = useCallback(() => history.push("/"), [history]);

  const goToLogin = useCallback(() => history.push("/login"), [history]);

  const goToSearch = useCallback(() => history.push("/search"), [history]);

  const goToMyPage = useCallback(() => history.push("/mypage"), [history]);

  const goToCreate = useCallback(() => history.push("/studyroom/create"), [history]);

  const goToSetting = useCallback((id) => history.push(`/studyroom/${id}/setting`), [history]);

  const goToStudy = useCallback(
    (id, token) =>
      history.push({
        pathname: `/studyroom/${id}`,
        state: {
          token,
        },
      }),
    [history],
  );

  return { goToMain, goToLogin, goToSearch, goToMyPage, goToCreate, goToSetting, goToStudy };
}

export default useGoToPage;
