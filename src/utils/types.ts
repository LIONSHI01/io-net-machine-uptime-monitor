import { AxiosResponse } from "axios";

export type ServerResponse = AxiosResponse<IoNetResponseData>;

export interface IoNetResponseData {
  status: string;
  data: DeviceConditions;
}

export type DeviceConditions = {
  device_id: string;
  device_name: string;
  status: Status;
  status_duration: string;
  is_working: boolean;
  total_download_traffic: number;
  total_upload_traffic: number;
  total_compute_hours_served: number;
  total_jobs: number;
  total_earnings: number;
  total_slashed_earnings: number;
  download_speed_mbps: number;
  upload_speed_mbps: number;
  connectivity_tier: number;
  down_percentage: number;
  downtime_by_date: DowntimeByDate;
};

type Status = "up" | "down";

export type DowntimeByDate = {
  date: DowntimeInfo;
};

export type DowntimeInfo = {
  downtime: number;
  note: string;
};
