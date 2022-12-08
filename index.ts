const url = "/api/v1/users/me";

interface userResponse {
  id: string;
  name: string;
  admin: boolean;
}

interface userResponseIncludePositions {
  id: string;
  name: string;
  admin: boolean;
  position: string;
}

interface manager {
  id: string;
  name: string;
}

interface userResponseIncludeManagers {
  id: string;
  name: string;
  admin: boolean;
  managers: manager[];
}
