CREATE TABLE account (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdtime TIMESTAMP,
    modifiedtime TIMESTAMP
);

CREATE TABLE Product (
	ID CHAR(13) PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	Price INT NOT NULL CHECK(price > 0),
	Amount INT NOT NULL CHECK(amount >= 0),
	Description TEXT,
	Manufacturer VARCHAR(50),
	Category VARCHAR(50),
	Condition SMALLINT CHECK(condition BETWEEN 1 AND 3),
	Thumbnail VARCHAR(255) NOT NULL,
	CreatedDate TIMESTAMP,
	ModifiedDate TIMESTAMP,
	CreatedBy VARCHAR(255),
	ModifiedBy VARCHAR(255)
);

INSERT INTO account(username, password, createdtime, modifiedtime) VALUES('phuc', '$argon2i$v=19$m=4096,t=3,p=1$Jl3O2JXPCUt3Irk2nuaQVg$yGgCd2Rc0a+rnA16qBLBLWnfrOrDIh/XVkpd9vU2BqM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Product(ID, Name, Price, Amount, Description, Manufacturer, Category, Condition, Thumbnail) VALUES('0001235432674','iPhone 12 Pro Max 128GB',1500, 15, '“Trùm cuối” của dòng iPhone 12 đã xuất hiện. iPhone 12 Pro Max là chiếc iPhone có màn hình lớn nhất từ trước đến nay, mang trên mình bộ vi xử lý mạnh nhất, camera đẳng cấp pro cùng kết nối 5G siêu tốc, cho bạn những trải nghiệm tuyệt vời chưa từng có.', 'china','apple',1,'https://images.fpt.shop/unsafe/fit-in/filters:quality(100):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2020/10/14/637382725406081030_ip-12-pro-max-vang-1.png');

INSERT INTO Product(ID, Name, Price, Amount, Description, Manufacturer, Category, Condition, Thumbnail) VALUES('0001235380974','Xiaomi POCO X3 Pro NFC 8GB-256GB',1500, 15, 'Xiaomi POCO X3 Pro NFC là tập hợp của mọi tính năng mà một game thủ cần trên smartphone. Màn hình siêu mượt, dung lượng pin khủng, sạc siêu nhanh, âm thanh chất lượng phòng thu và một cấu hình đáng kinh ngạc, có quá nhiều điều đang chờ đón bạn.', 'china','xiaomi',1,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/15/637567021358121732_poco-x3-pro-vang-1.jpg');

INSERT INTO Product(ID, Name, Price, Amount, Description, Manufacturer, Category, Condition, Thumbnail) VALUES('0000004321564','iPhone 12 Pro 128GB',1300, 7, 'Đến với đẳng cấp Pro đích thực, nơi mà những điều đặc biệt đang chờ đón bạn trên iPhone 12 Pro. Từ hệ thống camera Pro chụp thiếu sáng cực đỉnh, kết nối 5G siêu tốc cho đến bộ vi xử lý A14 Bionic nhanh nhất thế giới smartphone, vẫn còn nhiều bất ngờ khác để bạn khám phá.', 'china','apple',1,'https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/10/14/637382704773830272_ip-12-pro-vang-1.png');
