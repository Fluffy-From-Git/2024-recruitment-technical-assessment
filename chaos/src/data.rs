use axum::response::IntoResponse;
use axum::Json;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    let mut response = DataResponse {
        string_len: 0,
        int_sum: 0,
    };

    for data in request.data {
        match data {
            DataEnum::String(data) => response.string_len += data.len() as i32,
            DataEnum::Integer(data) => response.int_sum += data as i32,
        }
    }
    
    return (StatusCode::OK, Json(response));
}

#[derive(Deserialize)]
#[serde(untagged)]
enum DataEnum {
    String(String),
    Integer(i32),
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<DataEnum>,
}

#[derive(Serialize)]
struct DataResponse {
    string_len: i32,
    int_sum: i32,
}
