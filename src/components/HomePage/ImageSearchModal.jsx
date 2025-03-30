import { useState } from "react";
import { Modal, Upload, Button, Typography, Image } from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import uploadService from "@services/upload.service";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const ImageSearchModal = ({ visible, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleUpload = ({ file }) => {
    setUploadedFile(file);
    toast.success(`Hình ảnh "${file.name}" đã được tải lên!`);
  };

  const handleRemove = () => {
    setUploadedFile(null);
    toast.info("Hình ảnh đã được xóa!");
  };

  const handleSearch = async () => {
    if (!uploadedFile) {
      toast.warning("Vui lòng tải lên hình ảnh để tìm kiếm!");
      return;
    }

    setIsSearching(true);
    toast.info("Đang tìm kiếm sản phẩm tương tự...");

    try {
      const response = await uploadService.uploadImageToDisk(uploadedFile);

      console.log("response", response);
      const imageUrl = `http://localhost:5000/${response.metadata.path}`;
      console.log("imageUrl", imageUrl);
      if (response && response.metadata) {
        navigate(`/tim-kiem?hinh-anh=${imageUrl}`);
        // toast.success("Tải ảnh lên thành công");
      } else {
        toast.error("Lỗi tải ảnh lên");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      toast.error("Tải ảnh lên thất bại");
    }

    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      setUploadedFile(null); // Clear the uploaded file
      onClose(); // Close the modal
    }, 2000);
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <SearchOutlined />
          <span>Tìm kiếm bằng hình ảnh</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <div className="text-center">
        {!uploadedFile ? (
          <>
            <Text className="block mb-4">
              Tải lên một hình ảnh để tìm kiếm sản phẩm tương tự.
            </Text>
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                handleUpload({ file });
                return false; // Prevent automatic upload
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </>
        ) : (
          <>
            <Text className="block mb-4 text-green-600">
              Hình ảnh đã được tải lên thành công!
            </Text>
            <div className="relative mb-4">
              <Image
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                className="absolute top-2 right-2 bg-white shadow-md"
                onClick={handleRemove}
              />
            </div>
          </>
        )}
        <Button
          type="primary"
          onClick={handleSearch}
          style={{
            width: "100%",
            backgroundColor: "#c60018",
            borderColor: "#ffffff",
            color: "white",
            marginTop: "1rem",
          }}
          disabled={isSearching}
        >
          {isSearching ? (
            <div className="w-6 h-6 border-8 border-white border-dotted rounded-full animate-spin"></div>
          ) : (
            "Tìm kiếm"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ImageSearchModal;
