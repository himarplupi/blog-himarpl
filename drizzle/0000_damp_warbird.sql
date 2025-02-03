CREATE TABLE `himarpl_account` (
	`user_id` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`provider_account_id` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `account_user_id_idx` ON `himarpl_account` (`user_id`);
CREATE TABLE `himarpl_department` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`acronym` text(255) NOT NULL,
	`image` text(255),
	`description` text,
	`type` text(255) NOT NULL,
	`period_year` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);

CREATE UNIQUE INDEX `departments_type_acronym` ON `himarpl_department` (`type`,`acronym`);
CREATE TABLE `himarpl_period` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`logo` text(255),
	`name` text(255) NOT NULL,
	`description` text,
	`year` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);

CREATE UNIQUE INDEX `himarpl_period_year_unique` ON `himarpl_period` (`year`);
CREATE TABLE `himarpl_position` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);

CREATE TABLE `himarpl_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`authorId` text NOT NULL,
	`title` text NOT NULL,
	`metaTitle` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`raw_html` text NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`published_at` integer,
	FOREIGN KEY (`authorId`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `authorId_idx` ON `himarpl_post` (`authorId`);
CREATE INDEX `title_idx` ON `himarpl_post` (`title`);
CREATE UNIQUE INDEX `posts_authorId_slug` ON `himarpl_post` (`authorId`,`slug`);
CREATE TABLE `himarpl_program` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`content` text(255) NOT NULL,
	`department_id` text NOT NULL
);

CREATE TABLE `himarpl_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `session_userId_idx` ON `himarpl_session` (`userId`);
CREATE TABLE `himarpl_social_media` (
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`url` text NOT NULL,
	PRIMARY KEY(`userId`, `name`, `username`),
	FOREIGN KEY (`userId`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `himarpl_tag` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`parent_id` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);

CREATE UNIQUE INDEX `himarpl_tag_title_unique` ON `himarpl_tag` (`title`);
CREATE UNIQUE INDEX `himarpl_tag_slug_unique` ON `himarpl_tag` (`slug`);
CREATE TABLE `himarpl_tags_to_posts` (
	`postId` text NOT NULL,
	`tagId` text NOT NULL,
	PRIMARY KEY(`postId`, `tagId`),
	FOREIGN KEY (`postId`) REFERENCES `himarpl_post`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `himarpl_tag`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `himarpl_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`email_verified` integer DEFAULT (unixepoch()),
	`image` text(255),
	`username` text(255),
	`bio` text,
	`role` text(255) DEFAULT 'member',
	`last_login_at` integer,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer
);

CREATE UNIQUE INDEX `himarpl_user_username_unique` ON `himarpl_user` (`username`);
CREATE TABLE `himarpl_users_to_departments` (
	`user_id` text NOT NULL,
	`department_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`department_id`) REFERENCES `himarpl_department`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `himarpl_users_to_periods` (
	`user_id` text NOT NULL,
	`period_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`period_id`) REFERENCES `himarpl_period`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `himarpl_users_to_positions` (
	`user_id` text NOT NULL,
	`position_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `himarpl_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`position_id`) REFERENCES `himarpl_position`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `himarpl_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);

-- insert period data
INSERT INTO `himarpl_period` (`id`, `logo`, `name`, `description`, `year`) VALUES
('cm6ta3loy00012a67zsxwik4x', '', 'Kabinet Acendia', 'Kabinet Ascendia merupakan periode kabinet HIMARPL tahun 2024', 2024),
('cm6ta3loy00012a67zsxwia4y', '', 'Kabinet Sankara', 'Kabinet Sankara merupakan periode kabinet HIMARPL tahun 2023', 2023),

-- insert position data
INSERT INTO `himarpl_position` (`id`, `name`) VALUES
('cm6ta3loy00012a67zsxwik4x', 'Ketua'),
('cm6ta3loy00012a67zsxwik4y', 'Wakil Ketua'),
('cm6ta3loy00012a67zsxwik4z', 'Sekretaris'),
('cm6ta3loy00012a67zsxwik4a', 'Bendahara'),
('cm6ta3loy00012a67zsxwik4b', 'Staff'),


-- insert department data {Adapt to the DDL statement above}

-- Insert departments
INSERT INTO `himarpl_department` (`id`, `name`, `acronym`, `image`, `description`, `type`, `period_year`, `created_at`, `updated_at`) VALUES
('clxygtnjl0000oe7smg1mkztp', 'Komunikasi dan Informasi', 'kominfo', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/kominfo.jpg', 'Departmen Kominfo merupakan salah satu departemen yang tugas pokok dan fungsinya berada dalam ruang lingkup Komunikasi & Publikasi, yaitu membangun dan mengembangkan media publikasi dan informasi baik secara internal maupun eksternal. Lingkup kerja Departemen Kominfo ini mencakup ke dalam social media content creation and strategy, public relation, graphic design, video editing, dan web development.', 'BE', 2024, 1719565370, 1719569669),
('clxyiaefx000027iyasyypajs', 'Pimpinan', 'pimpinan', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/pimpinan.jpg', 'Ketua maupun Wakil Ketua memiliki peran dan tanggung jawab yang sangat penting dalam menjalankan roda organisasi. mencakup berbagai aspek organisasi, manajemen, dan representasi mahasiswa', 'BE', 2024, 1719567831, 1719569675),
('clxyiid2e000127iyi8o4dpv0', 'Sekretaris', 'sekretaris', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/sekben.jpg', 'Sekretaris Kabinet BE HIMARPL bertanggung jawab dalam merancang dan menjalankan fungsi administrasi kerumahtanggaan BE HIMARPL, serta bekerja sama dengan Sekretaris DP HIMARPL dan Departemen Administrasi dan Kesekretariatan.', 'BE', 2024, 1719568202, 1719569684),
('clxyinxpa000227iy5juxgjcz', 'Bendahara', 'bendahara', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/sekben.jpg', 'Bendahara Kabinet BE HIMARPL bertanggung jawab dalam mengatur dan mengelola mekanisme administrasi keuangan BE HIMARPL, serta bekerjasama dengan bendahara DP HIMARPL dan Departemen Keuangan', 'BE', 2024, 1719568462, 1719569647),
('clxyizi9t0000mwt2w1bd4n99', 'Administrasi dan Kesekretariatan', 'adkes', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/adkes.jpg', 'Departemen ini bertanggung jawab sebagai sekretaris kegiatan dan berkoordinasi dengan sekretaris kabinet. Departemen ini membantu berbagai kegiatan dengan memastikan administrasi dan dokumentasi berjalan lancar. Tugas utamanya meliputi pengarsipan, penyiapan notulensi, dan mendukung kelancaran komunikasi internal.', 'BE', 2024, 1719569002, 1719569635),
('clxyj51130001mwt2m5s9gm2r', 'Keuangan', 'keuangan', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/keuangan.jpg', 'Departemen ini berperan sebagai bendahara kegiatan dan berkoordinasi dengan bendahara kabinet. Dimana berkoordinasi erat dengan bendahara kabinet, Departemen keuangan memastikan bahwa alokasi dana sesuai dengan kebutuhan kegiatan dan memastikan kelancaran proses keuangan secara umum.', 'BE', 2024, 1719569260, 1719569663),
('clxyjcag40002mwt2458vy8hj', 'Pengembangan Sumber Daya Organisasi', 'psdo', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/psdo.jpg', 'Departemen PSDO terbagi menjadi 2 biro, di antaranya Biro LITBANG (Penelitian dan Pengembangan) dan Biro Kaderisasi. Biro LITBANG bertugas menjalankan program kerja yang dapat meningkatkan keharmonisan atau kekeluargaan di internal maupun eksternal HIMARPL. Biro Kaderisasi bertugas menjalankan program kerja yang menciptakan kader-kader yang unggul dan siap diberi amanah menjadi anggota HIMARPL dalam meningkatkan kualitas organisasi dari tahun ke tahun.', 'BE', 2024, 1719569599, 1719569599),
('clxyjitr50003mwt2j4ee9rzy', 'Pengabdian Pada Masyarakat', 'ppm', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/ppm.jpg', 'Departemen PPM (Pengabdian Pada Masyarakat) Himpunan Mahasiswa Rekayasa Perangkat Lunak Kampus UPI di Cibiru bertujuan untuk melakukan pengkajian dalam menindaklanjuti kondisi dan lingkungan sosial masyarakat berdasarkan keilmuan Rekayasa Perangkat Lunak. Departemen ini juga mengupayakan adanya kegiatan sosial yang dapat membantu masyarakat umum sebagai wujud interpretasi keilmuan tersebut. Dalam mencapai tujuan organisasi, PPM senantiasa berharap akan ridho Tuhan Yang Maha Esa serta kekuatan dalam melaksanakan tugas-tugasnya. Segala hal yang belum diatur atau memerlukan penyempurnaan pada mekanisme kerja organisasi akan diatur di masa yang akan datang.', 'BE', 2024, 1719570704, 1720833359),
('clxyjme5t0004mwt2qumbplba', 'Pengembangan Diri', 'pd', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/pd.jpg', 'Departemen Pengembangan Diri bertanggung jawab untuk mengembangkan potensi dan pengetahuan pribadi yang dimana tujuan akhirnya adalah menambah wawasan karakter dan sifat yang dimiliki mahasiswa rekayasa perangkat lunak terutama mengenai pendidikan', 'BE', 2024, 1719570870, 1719570870),
('clxyjp3td0005mwt26ol65bf1', 'Ekonomi Kreatif', 'ekraf', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/ekraf.jpg', 'Departemen Ekonomi Kreatif bergerak pada bidang kewirausahaan, di mana departemen ini berfokus untuk meningkatkan pemasukan HIMARPL. EKRAF bertanggung jawab dalam menumbuhkembangkan ekonomi di dalam HIMARPL, dan mendirikan usaha mandiri yang berkelanjutan bagi HIMARPL', 'BE', 2024, 1719570997, 1719570997),
('clxyjsdlo0006mwt2ap7h2hyf', 'Advokasi dan Kajian Strategis', 'advokastra', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/be/advo.jpg', 'Bertanggung jawab untuk menjembatani dan melayani kebutuhan mahasiswa dengan para pemangku kebijakan. Advokastra berusaha melayani dan mengawal setiap isu dengan analisis untuk memahami setiap permasalahan yang ada dalam menentukan solusi. Advokastra juga melakukan pelayanan dan pengadvokasian terhadap permasalahan permasalahan yang dialami mahasiswa dalam akademik, relasi sosial, sarana prasarana, serta isu-isu kemahasiswaan lainnya guna meningkatkan kesejahteraan mahasiswa.', 'BE', 2024, 1719571149, 1719571149),
('clxyjwpz70007mwt2gday4dub', 'Pimpinan', 'pimpinan', '', 'Ketua dan Wakil Ketua Dewan Perwakilan HIMARPL memiliki tanggung jawab penting dalam memastikan kelancaran operasional organisasi. Ketua bertanggung jawab untuk melaksanakan ketetapan Musyawarah Mahasiswa HIMARPL, merancang program kerja, mengkoordinasikan seluruh kegiatan, menjalin hubungan internal dan eksternal, serta mengevaluasi dan mengawasi program kerja. Sementara itu, Wakil Ketua membantu tugas-tugas Ketua baik internal maupun eksternal, mewakili Ketua apabila berhalangan hadir, dan bertanggung jawab kepada Ketua. Wakil Ketua juga berperan sebagai mitra kerja Ketua dalam menangani tugas-tugas internal dan eksternal organisas.', 'DP', 2024, 1719571352, 1720833485),
('clxyjz0040008mwt2306b96e6', 'Sekretaris', 'sekretaris', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/dp/sekben.jpg', 'Sekretaris DP bertugas merancang dan menjalankan fungsi administrasi kesekretariatan DP HIMARPL serta bertanggung jawab kepada Ketua DP HIMARPL. Selain itu, sekretaris memiliki wewenang mengonsultasikan segala jenis tugas sekretaris kepada Pimpinan DP HIMARPL.', 'DP', 2024, 1719571458, 1719571477),
('clxyk4i0w0009mwt2fc8pm33e', 'Bendahara', 'bendahara', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/dp/sekben.jpg', 'Bendahara pada DP bertugas mengatur mekanisme administrasi keuangan DP HIMARPL dengan berkoordinasi dengan Ketua DP HIMARPL. Selain itu, bendahara memiliki wewenang untuk bertanggung jawab mengenai tugas keuangan pada Pimpinan DP HIMARPL.', 'DP', 2024, 1719572115, 1719572220),
('clxyk8eeq000amwt2nntrybqg', 'Badan Legislasi', 'baleg', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/dp/baleg.jpg', 'Badan Legislasi, merupakan badan yang bertindak mengatur segala kebijakan, perundang-undangan atau produk hukum keorganisasian yang nantinya akan ditetapkan  bersama dengan ketua DP HIMARPL.', 'DP', 2024, 1719572297, 1719572297),
('clxykavyg000bmwt2q1bhn6w5', 'Badan Urusan Rumah Tangga dan Aspirasi', 'burta', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/dp/burta.jpg', 'BURTA (Badan Urusan Rumah Tangga dan Aspirasi) secara tujuan dan fungsi terbagi menjadi 2 bagian yaitu “Badan Urusan Rumah Tangga” dan “Aspirasi”. Badan Urusan Rumah Tangga bertugas untuk mengurus kebutuhan kerumahtanggaan HIMARPL dan Aspirasi bertugas untuk menampung aspirasi seluruh mahasiswa Rekayasa Perangkat Lunak UPI Kampus di Cibiru.', 'DP', 2024, 1719572413, 1719638255),
('clxykf68f000cmwt2kdqxcnlr', 'Komisi', 'komisi', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/department/dp/komisi.jpg', 'KOMISI Berperan sebagai pelaksana fungsi DP HIMARPL yaitu fungsi PENGAWASAN. Selain Pengawasan Komisi juga berhak menjaga Stabilitas dan Transparansi organisasi. Komisi melakukan Pengawasan Program Kerja mulai dari Pra Acara, berlangsungnya Acara dan Pasca Acara. Serta Komisi berhak meminta Progress Report setiap departemen pada saat Rapat Dengar. Program Kerja unggulan Komisi adalah PROKER APPRECIATION.', 'DP', 2024, 1719572613, 1719572650);

-- Insert programs for Komunikasi dan Informasi
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '1',
    'Narahubung',
    'clxygtnjl0000oe7smg1mkztp'
  ),
  (
    '2',
    'Sayembara Logo Kabinet',
    'clxygtnjl0000oe7smg1mkztp'
  ),
  (
    '3',
    'Dokumentasi dan Publikasi Kegiatan',
    'clxygtnjl0000oe7smg1mkztp'
  ),
  (
    '4',
    'Membuat berbagai konten video',
    'clxygtnjl0000oe7smg1mkztp'
  ),
  (
    '5',
    'Manajemen sosial media',
    'clxygtnjl0000oe7smg1mkztp'
  ),
  (
    '6',
    'Memelihara dan mengembangkan website HIMARPL',
    'clxygtnjl0000oe7smg1mkztp'
  );
-- Insert programs for Pimpinan (BE)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '7',
    'Dies Natalis RPL',
    'clxyiaefx000027iyasyypajs'
  ),
  (
    '8',
    'Ngobrol bareng departemen',
    'clxyiaefx000027iyasyypajs'
  ),
  (
    '9',
    'Sparing partner',
    'clxyiaefx000027iyasyypajs'
  );
-- Insert programs for Sekretaris (BE)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '10',
    'Pengadministrasian Surat',
    'clxyiid2e000127iyi8o4dpv0'
  ),
  (
    '11',
    'Pengadministrasian Sertifikat',
    'clxyiid2e000127iyi8o4dpv0'
  ),
  (
    '12',
    'SOP Kesekretariatan',
    'clxyiid2e000127iyi8o4dpv0'
  ),
  (
    '13',
    'Laporan notulensi dan presensi kegiatan',
    'clxyiid2e000127iyi8o4dpv0'
  ),
  (
    '14',
    'Pengarsipan berkas',
    'clxyiid2e000127iyi8o4dpv0'
  ),
  (
    '15',
    'Kalenderisasi',
    'clxyiid2e000127iyi8o4dpv0'
  );
-- Insert programs for Bendahara (BE)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '16',
    'Membuat Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO)',
    'clxyinxpa000227iy5juxgjcz'
  ),
  (
    '17',
    'Menetapkan dan mengesahkan RAPBO menjadi APBO',
    'clxyinxpa000227iy5juxgjcz'
  ),
  (
    '18',
    'Sosialisasi SOP Keuangan',
    'clxyinxpa000227iy5juxgjcz'
  ),
  (
    '19',
    'Melakukan pencairan iuran dana kemahasiswaan (IUK)',
    'clxyinxpa000227iy5juxgjcz'
  ),
  (
    '20',
    'Diskusi bersama departemen keuangan',
    'clxyinxpa000227iy5juxgjcz'
  );
-- Insert programs for Administrasi dan Kesekretariatan
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '21',
    'Bertanggung jawab atas pengelolaan dokumen dan arsip terkait kegiatan yang dilaksanakan',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '22',
    'Memastikan pengarsipan yang sistematis, dan ketersediaan dokumen yang diperlukan dengan mudah',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '23',
    'Melaporkan secara berkala aktivitas dan progres kegiatan kepada Sekretaris Kabinet',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '24',
    'Menyajikan laporan yang jelas, terperinci, dan komprehensif mengenai status setiap kegiatan serta pencapaian yang telah dicapai',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '25',
    'Mengawasi dan memastikan pelaksanaan setiap kegiatan, termasuk proses proposal dan penyelesaian laporan pertanggungjawaban (LPJ)',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '26',
    'Memastikan bahwa setiap tahapan kegiatan dilaksanakan sesuai dengan rencana, tenggat waktu, dan standar yang ditetapkan',
    'clxyizi9t0000mwt2w1bd4n99'
  ),
  (
    '27',
    'Memastikan penyusunan dan penggunaan dokumen sesuai dengan ketentuan yang sudah berlaku',
    'clxyizi9t0000mwt2w1bd4n99'
  );
-- Insert programs for Keuangan
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '28',
    'Sosialisasi SOP Keuangan',
    'clxyj51130001mwt2m5s9gm2r'
  ),
  (
    '29',
    'Bendahara kegiatan',
    'clxyj51130001mwt2m5s9gm2r'
  ),
  (
    '30',
    'Menghimpun dana',
    'clxyj51130001mwt2m5s9gm2r'
  ),
  (
    '31',
    'Melakukan pencatatan keuangan',
    'clxyj51130001mwt2m5s9gm2r'
  ),
  (
    '32',
    'Melakukan pencairan iuran dana kemahasiswaan (IUK)',
    'clxyj51130001mwt2m5s9gm2r'
  );
-- Insert programs for Pengembangan Sumber Daya Organisasi
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '33',
    'KOU: Meningkatkan kualitas dan kinerja sumber daya organisasi yang ditujukan kepada mahasiswa Program Studi Rekayasa Perangkat Lunak Kampus UPI di Cibiru',
    'clxyjcag40002mwt2458vy8hj'
  ),
  (
    '34',
    'MABIM: Merencanakan dan melaksanakan alur pengkaderan bagi mahasiswa Rekayasa Perangkat Lunak Kampus UPI di Cibiru',
    'clxyjcag40002mwt2458vy8hj'
  ),
  (
    '35',
    'One Day With HIMA (ODWH): Memperkenalkan HIMARPL kepada mahasiswa baru Rekayasa Perangkat Lunak Kampus UPI di Cibiru',
    'clxyjcag40002mwt2458vy8hj'
  ),
  (
    '36',
    'Studi Banding: Merintis dan meningkatkan hubungan kerjasama dengan organisasi kemahasiswaan dan atau unit kegiatan kemahasiswaan di lingkungan Kampus UPI di Cibiru dan atau instansi terkait untuk pengembangan organisasi.',
    'clxyjcag40002mwt2458vy8hj'
  ),
  (
    '37',
    'Makrab HIMARPL',
    'clxyjcag40002mwt2458vy8hj'
  );
-- Insert programs for Pengabdian Pada Masyarakat
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '38',
    'RPL Goes To School: Mengadakan pengajaran berbasis teknologi pada masyarakat',
    'clxyjitr50003mwt2j4ee9rzy'
  ),
  (
    '39',
    'RPL Peduli: Meningkatkan kepedulian warga HIMARPL terhadap lingkungan sekitar',
    'clxyjitr50003mwt2j4ee9rzy'
  ),
  (
    '40',
    'Digimon: Melakukan pengabdian pada masyarakat',
    'clxyjitr50003mwt2j4ee9rzy'
  ),
  (
    '41',
    'RPL Berbagi: Melakukan kerja sama dengan pihak luar yang berhubungan dengan kegiatan sosial',
    'clxyjitr50003mwt2j4ee9rzy'
  );
-- Insert programs for Pengembangan Diri
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '42',
    'Info lomba dan Beasiswa',
    'clxyjme5t0004mwt2qumbplba'
  ),
  (
    '43',
    'Funmatch',
    'clxyjme5t0004mwt2qumbplba'
  ),
  (
    '44',
    'Tips & Trick',
    'clxyjme5t0004mwt2qumbplba'
  ),
  (
    '45',
    'Section',
    'clxyjme5t0004mwt2qumbplba'
  );
-- Insert programs for Ekonomi Kreatif
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '46',
    'RPL Shop',
    'clxyjp3td0005mwt26ol65bf1'
  ),
  (
    '47',
    'Bazaar',
    'clxyjp3td0005mwt26ol65bf1'
  ),
  (
    '48',
    'Rekapreneur',
    'clxyjp3td0005mwt26ol65bf1'
  );
-- Insert programs for Advokasi dan Kajian Strategis
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '49',
    'Penjaringan Mahasiswa Baru (PAJAMAS)',
    'clxyjsdlo0006mwt2ap7h2hyf'
  ),
  (
    '50',
    'Kajian Isu Mahasiswa',
    'clxyjsdlo0006mwt2ap7h2hyf'
  ),
  (
    '51',
    'HIMA Talks and Campus Tour',
    'clxyjsdlo0006mwt2ap7h2hyf'
  ),
  (
    '52',
    'Gradu Parade: Arak-arakan mahasiswa',
    'clxyjsdlo0006mwt2ap7h2hyf'
  ),
  (
    '53',
    'Supporteran',
    'clxyjsdlo0006mwt2ap7h2hyf'
  );
-- Insert programs for Pimpinan (DP)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '54',
    'Legislative Up',
    'clxyjwpz70007mwt2gday4dub'
  ),
  (
    '55',
    'Legislative Award:',
    'clxyjwpz70007mwt2gday4dub'
  );
-- Insert programs for Sekretaris (DP)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '56',
    'Sosialisasi SOP Kesekretariatan',
    'clxyjz0040008mwt2306b96e6'
  ),
  (
    '57',
    'Pengarsipan Berkas',
    'clxyjz0040008mwt2306b96e6'
  ),
  (
    '58',
    'Notulensi dan Presensi',
    'clxyjz0040008mwt2306b96e6'
  ),
  (
    '59',
    'Publikasi Organigram dan Kalenderisasi',
    'clxyjz0040008mwt2306b96e6'
  );
-- Insert programs for Bendahara (DP)
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '60',
    'Membuat Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO)',
    'clxyk4i0w0009mwt2fc8pm33e'
  ),
  (
    '61',
    'Menetapkan dan mengesahkan RAPBO menjadi APBO',
    'clxyk4i0w0009mwt2fc8pm33e'
  ),
  (
    '62',
    'Sosialisasi SOP Keuangan',
    'clxyk4i0w0009mwt2fc8pm33e'
  ),
  (
    '63',
    'Melakukan pencairan iuran dana kemahasiswaan (IUK)',
    'clxyk4i0w0009mwt2fc8pm33e'
  ),
  (
    '64',
    'Merancang SOP Keuangan HIMARPL bersama Bendahara BE HIMARPL',
    'clxyk4i0w0009mwt2fc8pm33e'
  );
-- Insert programs for Badan Legislasi
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '65',
    'Sidang Paripurna (MUMAS dan LPJ setengah periode)',
    'clxyk8eeq000amwt2nntrybqg'
  ),
  (
    '66',
    'Sidang Konstitusi',
    'clxyk8eeq000amwt2nntrybqg'
  ),
  (
    '67',
    'Konstitusi Aspirasi',
    'clxyk8eeq000amwt2nntrybqg'
  );
-- Insert programs for Badan Urusan Rumah Tangga dan Aspirasi
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '68',
    'Manajemen Inventaris',
    'clxykavyg000bmwt2q1bhn6w5'
  ),
  (
    '69',
    'Manajemen Piket',
    'clxykavyg000bmwt2q1bhn6w5'
  ),
  (
    '70',
    'RESPIRATION (Reservoir of Resources Aspiration)',
    'clxykavyg000bmwt2q1bhn6w5'
  ),
  (
    '71',
    'Perekrutan dan Pelantikan',
    'clxykavyg000bmwt2q1bhn6w5'
  );
-- Insert programs for Komisi
INSERT INTO
  `himarpl_program` (`id`, `content`, `department_id`)
VALUES
  (
    '72',
    'Memberikan apresiasi kepada individu atau kelompok atas kinerja dan kontribusi individu atau kelompok tersebut..',
    'clxykf68f000cmwt2kdqxcnlr'
  ),
  (
    '73',
    'Melaporkan kepada ketua tentang hasil pengawasannya',
    'clxykf68f000cmwt2kdqxcnlr'
  ),
  (
    '74',
    'Merumuskan dan melaporkan rancangan undang-undang yang dibutuhkan kepada ketua DP HIMARPL',
    'clxykf68f000cmwt2kdqxcnlr'
  ),
  (
    '75',
    'Melakukan pengawasan terhadap departemen yang diawasinya terhadap staf teras dan departemen yang diawasinya melalui program kerja',
    'clxykf68f000cmwt2kdqxcnlr'
  );



-- Insert tags (continued)
INSERT INTO
  `himarpl_tag` (
    `id`,
    `title`,
    `slug`,
    `created_at`,
    `updated_at`,
    `parent_id`
  )
VALUES
  (
    'clyhxvclq002kpcxc76vfbh6o',
    'keberagaman',
    'keberagaman',
    1720781260,
    1720781288,
    'clyhwi98w0006pcxc5cp4eywy'
  ),
  (
    'clyilw9w10002k5890d10og3h',
    'kalender akademik',
    'kalender-akademik',
    1720785614,
    1720785614,
    NULL
  ),
  (
    'clyir65bv00002p1439fiw9kf',
    'ekraf',
    'ekraf',
    1720794473,
    1720794473,
    NULL
  ),
  (
    'clyir68q800012p14i6r4lk1w',
    'merch',
    'merch',
    1720794477,
    1720833526,
    'cly42b4o80000e0epuhox87kq'
  ),
  (
    'clyjesfxs0000r75m3iq3jqf8',
    'pemrograman',
    'pemrograman',
    1720822144,
    1720833544,
    'clyhwgdmi0001pcxcs8q3z03i'
  ),
  (
    'clyjfq6bo000013zwi9lge84n',
    'english test',
    'english-test',
    1720824918,
    1720824918,
    NULL
  ),
  (
    'clyjfqc4m000113zwwihjuq7m',
    'ptesol',
    'ptesol',
    1720824925,
    1720824925,
    NULL
  ),
  (
    'clyjhkycg0000ne5t1syfzzzc',
    'berita himarpl',
    'berita-himarpl',
    1720831633,
    1720833526,
    'cly42b4o80000e0epuhox87kq'
  ),
  (
    'clyjkk1j90000o47xwiiqvmqx',
    'developer announcement',
    'developer-announcement',
    1720836630,
    1720836630,
    NULL
  ),
  (
    'clyjm9e3o0000gh6v2ku3o6a0',
    'rekapstore',
    'rekapstore',
    1720841892,
    1720841892,
    NULL
  ),
  (
    'clyjm9jm30001gh6vj0da7ni0',
    'artikel',
    'artikel',
    1720841899,
    1720841899,
    NULL
  ),
  (
    'clyu5vbse0000a26aaqezdx5l',
    'c++',
    'c-plus-plus',
    1721510690,
    1721510818,
    'clyhwgdmi0001pcxcs8q3z03i'
  ),
  (
    'clyu5xbfb0002a26arw749wqg',
    'c',
    'c',
    1721510783,
    1721510818,
    'clyhwgdmi0001pcxcs8q3z03i'
  ),
  (
    'clyu5zcu600016sm9uokheojg',
    'c#',
    'c-sharp',
    1721510878,
    1721510904,
    'clyhwgdmi0001pcxcs8q3z03i'
  );

-- Insert post data

INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzpkwmq000fq2e5c4d1d8d0', '', '', '', '', '<p></p>', NULL, 1722940772, 1722940775, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzqj3oy001mq2e5774cithr', 'Rekomendasi Webtoon Untuk Orang Dewasa', 'rekomendasi webtoon untuk orang dewasa', 'buh02v15zuxqvjkefyzkhztb', 'Teman-teman suka baca komik atau Webtoon?\n\nAku ada beberapa rekomendasi cerita webtoon yang menurut aku bisa ningkatin ilmu dalam ekonomi, apalagi bisnis.\n\n\n\n\nSerena\n\nNot your type reincarnation', '<p>Teman-teman suka baca komik atau Webtoon?</p><p>Aku ada beberapa rekomendasi cerita webtoon yang menurut aku bisa ningkatin ilmu dalam ekonomi, apalagi bisnis.</p><ol><li><p>Serena</p></li><li><p>Not your type reincarnation</p></li></ol>', NULL, 1724128706, 1724129095, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzszljn00074yis1us8evcd', '', '', '', '', '<p></p>', NULL, 1722881626, 1722881629, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxwwgcmq000010ef3m45gkax', 'Cara Upload/Sisipkan Gambar dan File di Web Ini', 'cara uploadsisipkan gambar dan file di web ini', 'cara-uploadsisipkan-gambar-dan-file-di-web-ini', 'Siapkan:\n\n\n\nAkun Github.\n\nGambar dan file yang mau disisipkan.\n\nLangkah-langkah:\n\n\n\nUpload di github repo aset-asetnya.\n\nCopy link aset ke cdn jsDelivr.\n\nCopy link dari cdn jsDelivr ke menu di editor wed blog himarpl.\n\nLink Terkait:\n\n\n\nGithub.com\n\njsDelivr\n\nVideo Selengkapnya\n\n', '<img class="mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded" src="https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/Screenshot%202024-07-13%20104004.png" alt="sisipkan image" title="sisipkan image"><h3>Siapkan:</h3><ol><li><p>Akun Github.</p></li><li><p>Gambar dan file yang mau disisipkan.</p></li></ol><h3>Langkah-langkah:</h3><ol><li><p>Upload di github repo aset-asetnya.</p></li><li><p>Copy link aset ke <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.jsdelivr.com/github">cdn jsDelivr</a>.</p></li><li><p>Copy link dari cdn jsDelivr ke menu di editor wed blog himarpl.</p></li></ol><h3>Link Terkait:</h3><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com">Github.com</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.jsdelivr.com/github"><strong>jsDelivr</strong></a></p></li></ul><h3>Video Selengkapnya</h3><div data-youtube-video=""><iframe class="mx-auto sm:w-[60vw] w-full h-auto aspect-video max-w-full rounded" width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/v7gvc5_9Mlk" start="0"></iframe></div>', 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/Screenshot%202024-07-13%20104004.png', 1720740392, 1720747475, 1720747475);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzqt3y10026q2e5hluhltzc', '', '', '', '', '<p></p>', NULL, 1722968157, 1722968176, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxwwgcmq000010ef3m45gkax', 'Nanti ini buat artikel web mabim yah kaya', 'nanti ini buat artikel web mabim yah kaya', 'litarzzp899gbnv4ze0he0rc', 'devlog devlog gitu lah\n\n', '<p>devlog devlog gitu lah</p><p></p>', NULL, 1722026980, 1730356775, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzp9hlo000bq2e5jusfzxgd', '', '', '', '', '<p></p>', NULL, 1723339502, 1723339506, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxwwgcmq000010ef3m45gkax', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'lorem ipsum dolor sit amet consectetur adipiscing elit', 'mp7cxdyj6d6qzu6hzufbyn0r', 'Aenean at rutrum turpis. Cras mollis turpis eget ex faucibus, mattis semper risus feugiat. Nulla accumsan tellus vel nunc pharetra dapibus. Vivamus commodo ipsum consectetur, molestie orci finibus, pharetra mi. Vestibulum varius augue posuere mauris aliquam, non tempus orci finibus. Maecenas feugiat eget urna sed pretium. Nulla auctor sagittis sapien tincidunt congue. Aliquam et sollicitudin justo. Nam nec odio nec ipsum condimentum varius et sit amet nisl. Ut vitae rhoncus nisi, vitae faucibus metus. Phasellus cursus ultrices lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis nec blandit purus. Maecenas tincidunt augue vel sagittis laoreet.\n\nNam eget consectetur enim, vel imperdiet ipsum. Nam ac massa vel nibh gravida tristique vitae id ipsum. Fusce dignissim lacus quis quam rutrum, at blandit magna gravida. Praesent ac ante ut arcu varius luctus. Quisque aliquam tellus in arcu gravida vehicula. Aliquam et pulvinar ipsum. Donec ut metus nec augue fringilla pretium id non ante. Integer ac aliquam tortor, a tempus leo.\n\n\n\nEtiam condimentum risus mi, nec fermentum eros bibendum eu. Suspendisse cursus eros auctor, ullamcorper urna sit amet, pretium magna. Maecenas magna purus, pulvinar ac tincidunt eu, volutpat ac neque. Aliquam at porta est. Vestibulum sit amet nunc ut mi scelerisque scelerisque. Suspendisse vitae tristique lorem. Praesent at nisl est. Maecenas elementum dolor urna, aliquet rhoncus tortor posuere id. Aenean at ipsum nec purus tempor porttitor sit amet sit amet orci. Ut id ipsum eget odio posuere facilisis vitae et est. Praesent venenatis dignissim ipsum, quis euismod enim vulputate sit amet. Morbi velit leo, blandit ut neque sed, imperdiet commodo erat. Quisque sed ipsum justo. Nullam pretium lacinia enim, sed pharetra sapien iaculis dapibus. Cras eget sapien vitae magna viverra rutrum. Pellentesque congue dui id orci dapibus tincidunt a sed ex.\n\nDonec rhoncus dui in nisl pellentesque ullamcorper. Nunc pharetra sit amet nibh id tempor. Duis iaculis neque id auctor suscipit. Vestibulum volutpat, turpis eget tempor commodo, nisi felis euismod tortor, sed interdum quam nibh vel ligula. Curabitur sit amet dui felis. Phasellus sapien velit, pretium et ante in, tincidunt tristique ex. Maecenas accumsan tellus egestas eros faucibus hendrerit. Phasellus at augue libero. Aliquam rutrum magna elit, ac euismod mauris dictum ut.\n\nLampiran:\n\n\n\nFile 1', '<p>Aenean at rutrum turpis. Cras mollis turpis eget ex faucibus, mattis semper risus feugiat. Nulla accumsan tellus vel nunc pharetra dapibus. Vivamus commodo ipsum consectetur, molestie orci finibus, pharetra mi. Vestibulum varius augue posuere mauris aliquam, non tempus orci finibus. Maecenas feugiat eget urna sed pretium. Nulla auctor sagittis sapien tincidunt congue. Aliquam et sollicitudin justo. Nam nec odio nec ipsum condimentum varius et sit amet nisl. Ut vitae rhoncus nisi, vitae faucibus metus. Phasellus cursus ultrices lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis nec blandit purus. Maecenas tincidunt augue vel sagittis laoreet.</p><p>Nam eget consectetur enim, vel imperdiet ipsum. Nam ac massa vel nibh gravida tristique vitae id ipsum. Fusce dignissim lacus quis quam rutrum, at blandit magna gravida. Praesent ac ante ut arcu varius luctus. Quisque aliquam tellus in arcu gravida vehicula. Aliquam et pulvinar ipsum. Donec ut metus nec augue fringilla pretium id non ante. Integer ac aliquam tortor, a tempus leo.</p><img class="mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded" src="https://cdn.jsdelivr.net/gh/DikDns/aset@main/lufy-smile-gear-5.jpg" alt="luffy" title="luffy"><p>Etiam condimentum risus mi, nec fermentum eros bibendum eu. Suspendisse cursus eros auctor, ullamcorper urna sit amet, pretium magna. Maecenas magna purus, pulvinar ac tincidunt eu, volutpat ac neque. Aliquam at porta est. Vestibulum sit amet nunc ut mi scelerisque scelerisque. Suspendisse vitae tristique lorem. Praesent at nisl est. Maecenas elementum dolor urna, aliquet rhoncus tortor posuere id. Aenean at ipsum nec purus tempor porttitor sit amet sit amet orci. Ut id ipsum eget odio posuere facilisis vitae et est. Praesent venenatis dignissim ipsum, quis euismod enim vulputate sit amet. Morbi velit leo, blandit ut neque sed, imperdiet commodo erat. Quisque sed ipsum justo. Nullam pretium lacinia enim, sed pharetra sapien iaculis dapibus. Cras eget sapien vitae magna viverra rutrum. Pellentesque congue dui id orci dapibus tincidunt a sed ex.</p><p>Donec rhoncus dui in nisl pellentesque ullamcorper. Nunc pharetra sit amet nibh id tempor. Duis iaculis neque id auctor suscipit. Vestibulum volutpat, turpis eget tempor commodo, nisi felis euismod tortor, sed interdum quam nibh vel ligula. Curabitur sit amet dui felis. Phasellus sapien velit, pretium et ante in, tincidunt tristique ex. Maecenas accumsan tellus egestas eros faucibus hendrerit. Phasellus at augue libero. Aliquam rutrum magna elit, ac euismod mauris dictum ut.</p><p>Lampiran:</p><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/DikDns/aset@main/C%2B%2B%20Best%20Practices%20by%20Jason%20Turner.pdf">File 1</a></p></li></ul>', 'https://cdn.jsdelivr.net/gh/DikDns/aset@main/lufy-smile-gear-5.jpg', 1720737945, 1730508657, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzqr1ag001yq2e5sn89qcnr', '', '', '', '', '<p></p>', NULL, 1722874559, 1722874562, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxy7pksx0005khky4kam017x', 'Rangkuman Kalender Akademik UPI 2024/2025', 'rangkuman kalender akademik upi 20242025', 'rangkuman-kalender-akademik-upi-20242025', 'Pendaftaran Mahasiswa Baru:\n\n\n\nSNMPTN:\n\n\n\nPengisian PDSS: 1 Des 2023 - 8 Feb 2024\n\nPendaftaran: 14 - 28 Feb 2024\n\nPengumuman Kelulusan: 28 Mar 2024\n\nSNBT:\n\n\n\nPendaftaran: 23 Mar - 14 Apr 2024\n\nPelaksanaan Tes UTBK: 8 - 14 dan 22 - 28 Mei 2024\n\nPengumuman Kelulusan: 20 Jun 2024\n\nSMM PTN BARAT:\n\n\n\nPendaftaran: 2 Mei - 27 Jun 2024\n\nPelaksanaan Tes UTBK: 3 - 4 Jul 2024\n\nPengumuman Kelulusan: 18 Jul 2024\n\nSeleksi Mandiri Jalur Reguler dan Prestasi Istimewa:\n\n\n\nPendaftaran: 1 Apr - 30 Jun 2024\n\nPelaksanaan UTBK: 17 - 21 Jul 2024\n\nPelaksanaan Ujian Keterampilan dan/atau Wawancara: 22 - 23 Jul 2024\n\nPengumuman Kelulusan: 24 Jul 2024\n\nSemester Ganjil:\n\n\n\nPerkuliahan:\n\n\n\nAwal Perkuliahan: 26 Ags 2024\n\nAkhir Perkuliahan: 13 Des 2024\n\nUjian:\n\n\n\nUjian Tengah Semester (UTS): 21 - 25 Okt 2024\n\nUjian Akhir Semester (UAS): 26 Des 2024 - 12 Jan 2025\n\nRemedial dan Ujian Ulang: 8 - 12 Jan 2025\n\nPemasukan Nilai: 8 - 16 Jan 2025\n\nSemester Genap:\n\n\n\nPerkuliahan:\n\n\n\nAwal Perkuliahan: 20 Jan 2025\n\nAkhir Perkuliahan: 24 Mei 2025\n\nUjian:\n\n\n\nUjian Tengah Semester (UTS): 24 - 28 Mar 2025\n\nUjian Akhir Semester (UAS): 27 Mei - 7 Jun 2025\n\nRemedial dan Ujian Ulang: 10 - 14 Jun 2025\n\nPemasukan Nilai: 13 - 25 Jun 2025\n\nSemester Antara (Padat):\n\n\n\nPerkuliahan:\n\n\n\nPendaftaran: 2 - 13 Mei 2025\n\nAwal Perkuliahan: 24 Jun 2025\n\nAkhir Perkuliahan: 16 Agu 2025\n\nUjian:\n\n\n\nUjian Akhir: 19 - 23 Agu 2025\n\nPemasukan Nilai: 26 - 31 Agu 2025\n\nWisuda:\n\n\n\nWisuda Gelombang I: 19 Feb 2025\n\nWisuda Gelombang II: 18 - 19 Jun 2025\n\nWisuda Gelombang III: 15 - 16 Okt 2025\n\nLampiran:\n\n\n\nSurat Keputusan', '<img class="mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded" src="https://cdn.jsdelivr.net/gh/himarpl/aset-blog@main/chandan-chaurasia-cXmyIJ8cc1A-unsplash.jpg" alt="calendar" title="calendar"><h2><strong>Pendaftaran Mahasiswa Baru:</strong></h2><ul><li><p><strong>SNMPTN:</strong></p><ul><li><p>Pengisian PDSS: 1 Des 2023 - 8 Feb 2024</p></li><li><p>Pendaftaran: 14 - 28 Feb 2024</p></li><li><p>Pengumuman Kelulusan: 28 Mar 2024</p></li></ul></li><li><p><strong>SNBT:</strong></p><ul><li><p>Pendaftaran: 23 Mar - 14 Apr 2024</p></li><li><p>Pelaksanaan Tes UTBK: 8 - 14 dan 22 - 28 Mei 2024</p></li><li><p>Pengumuman Kelulusan: 20 Jun 2024</p></li></ul></li><li><p><strong>SMM PTN BARAT:</strong></p><ul><li><p>Pendaftaran: 2 Mei - 27 Jun 2024</p></li><li><p>Pelaksanaan Tes UTBK: 3 - 4 Jul 2024</p></li><li><p>Pengumuman Kelulusan: 18 Jul 2024</p></li></ul></li><li><p><strong>Seleksi Mandiri Jalur Reguler dan Prestasi Istimewa:</strong></p><ul><li><p>Pendaftaran: 1 Apr - 30 Jun 2024</p></li><li><p>Pelaksanaan UTBK: 17 - 21 Jul 2024</p></li><li><p>Pelaksanaan Ujian Keterampilan dan/atau Wawancara: 22 - 23 Jul 2024</p></li><li><p>Pengumuman Kelulusan: 24 Jul 2024</p></li></ul></li></ul><hr><h2><strong>Semester Ganjil:</strong></h2><ul><li><p><strong>Perkuliahan:</strong></p><ul><li><p>Awal Perkuliahan: 26 Ags 2024</p></li><li><p>Akhir Perkuliahan: 13 Des 2024</p></li></ul></li><li><p><strong>Ujian:</strong></p><ul><li><p>Ujian Tengah Semester (UTS): 21 - 25 Okt 2024</p></li><li><p>Ujian Akhir Semester (UAS): 26 Des 2024 - 12 Jan 2025</p></li><li><p>Remedial dan Ujian Ulang: 8 - 12 Jan 2025</p></li><li><p>Pemasukan Nilai: 8 - 16 Jan 2025</p></li></ul></li></ul><hr><h2><strong>Semester Genap:</strong></h2><ul><li><p><strong>Perkuliahan:</strong></p><ul><li><p>Awal Perkuliahan: 20 Jan 2025</p></li><li><p>Akhir Perkuliahan: 24 Mei 2025</p></li></ul></li><li><p><strong>Ujian:</strong></p><ul><li><p>Ujian Tengah Semester (UTS): 24 - 28 Mar 2025</p></li><li><p>Ujian Akhir Semester (UAS): 27 Mei - 7 Jun 2025</p></li><li><p>Remedial dan Ujian Ulang: 10 - 14 Jun 2025</p></li><li><p>Pemasukan Nilai: 13 - 25 Jun 2025</p></li></ul></li></ul><hr><h3><strong>Semester Antara (Padat):</strong></h3><ul><li><p><strong>Perkuliahan:</strong></p><ul><li><p>Pendaftaran: 2 - 13 Mei 2025</p></li><li><p>Awal Perkuliahan: 24 Jun 2025</p></li><li><p>Akhir Perkuliahan: 16 Agu 2025</p></li></ul></li><li><p><strong>Ujian:</strong></p><ul><li><p>Ujian Akhir: 19 - 23 Agu 2025</p></li><li><p>Pemasukan Nilai: 26 - 31 Agu 2025</p></li></ul></li></ul><h3><strong>Wisuda:</strong></h3><ul><li><p><strong>Wisuda Gelombang I:</strong> 19 Feb 2025</p></li><li><p><strong>Wisuda Gelombang II:</strong> 18 - 19 Jun 2025</p></li><li><p><strong>Wisuda Gelombang III:</strong> 15 - 16 Okt 2025</p><p></p></li></ul><h3><strong>Lampiran:</strong></h3><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://cdn.jsdelivr.net/gh/himarpl/aset-blog@main/Surat_Keputusan_Kalender_Akademik_2024-2025.pdf">Surat Keputusan</a></p></li></ul>', 'https://cdn.jsdelivr.net/gh/himarpl/aset-blog@main/chandan-chaurasia-cXmyIJ8cc1A-unsplash.jpg', 1720650546, 1720651220, 1720651220);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxwwgcmq000010ef3m45gkax', 'Tulis apapun bisa disini', 'tulis apapun bisa disini', 'qhzldl11jklekonhq0pm1jl0', 'Markdown support\n\n', '<p>Markdown support</p><p></p>', NULL, 1722241953, 1724943251, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxy7pksx0005khky4kam017x', 'Pendaftaran PTESOL Kampus Cibiru Bulan Juli 2024', 'pendaftaran ptesol kampus cibiru bulan juli 2024', 'pendaftaran-ptesol-kampus-cibiru-bulan-juli-2024', 'Penyelenggaraan PTESOL di Kampus UPI di Cibiru akan dilaksanakan kembali pada tanggal 23 Juli 2024, untuk pendaftaran silakan mengisi di Google form dibawah ini\n\n\n\nhttps://docs.google.com/forms/d/e/1FAIpQLScN0AnhrZWx7zW8jjyLsq71pHq4IHvbmbhrY2f64NzQj1p4FA/viewform\n\nPTESOL (Proficiency Test of English to Speakers of Other Languages)\n\nPTESOL adalah instrumen tes berbasis komputer yang digunakan untuk mengevaluasi kemampuan bahasa Inggris penutur non-asli dalam konteks akademik. Tiga keterampilan bahasa dan bidang pengetahuan yang diuji dalam tes ini adalah:\n\n\n\nKeterampilan mendengarkan: Bagian ini mengukur kemampuan peserta tes untuk memahami percakapan dalam bahasa Inggris yang digunakan dalam setting akademik, seperti diskusi akademik, percakapan kelas, dan kehidupan kampus secara umum.\n\nStruktur dan tata bahasa: Bagian ini mengukur kemampuan peserta tes untuk memahami dan menentukan penggunaan tata bahasa dan struktur yang tepat dalam bahasa Inggris tertulis standar.\n\nKeterampilan membaca: Bagian ini mengukur kemampuan peserta tes untuk membaca dan memahami teks bahasa Inggris serta kosakata secara kontekstual dalam teks yang disediakan.\n\n\n\nSertifikat PTESOL dapat digunakan (dan telah digunakan) untuk berbagai tujuan, seperti:\n\n\n\nTes penempatan bagi peserta program pelatihan bahasa Inggris di UPI Language Center;\n\nUntuk memantau kemajuan peserta yang mengikuti program pelatihan bahasa Inggris di UPI Language Center (tes kemajuan);\n\nTes keluar untuk mahasiswa di semua tingkat (sarjana, magister, dan doktoral) UPI.\n\nPersyaratan tes seleksi bagi pelamar pegawai negeri sipil.\n\nPersyaratan masuk untuk studi lanjut.\n\nSerdos (Sertifikasi Dosen).\n\nUPI Language Center menawarkan layanan pengujian PTESOL kepada seluruh anggota staf akademik UPI dan masyarakat umum. Pengujian PTESOL dapat dilakukan di laboratorium tes UPI Language Center (mode CBT) atau, atas permintaan, di lokasi sekolah atau institusi yang bekerja sama (mode kertas dan pensil).\n\nBrosur PTESOL dapat diunduh di sini.', '<p>Penyelenggaraan PTESOL di Kampus UPI di Cibiru akan dilaksanakan kembali pada tanggal 23 Juli 2024, untuk pendaftaran silakan mengisi di Google form dibawah ini</p><ul><li><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.google.com/forms/d/e/1FAIpQLScN0AnhrZWx7zW8jjyLsq71pHq4IHvbmbhrY2f64NzQj1p4FA/viewform">https://docs.google.com/forms/d/e/1FAIpQLScN0AnhrZWx7zW8jjyLsq71pHq4IHvbmbhrY2f64NzQj1p4FA/viewform</a></p></li></ul><h3>PTESOL (Proficiency Test of English to Speakers of Other Languages)</h3><p>PTESOL adalah instrumen tes berbasis komputer yang digunakan untuk mengevaluasi kemampuan bahasa Inggris penutur non-asli dalam konteks akademik. Tiga keterampilan bahasa dan bidang pengetahuan yang diuji dalam tes ini adalah:</p><ol><li><p><strong>Keterampilan mendengarkan</strong>: Bagian ini mengukur kemampuan peserta tes untuk memahami percakapan dalam bahasa Inggris yang digunakan dalam setting akademik, seperti diskusi akademik, percakapan kelas, dan kehidupan kampus secara umum.</p></li><li><p><strong>Struktur dan tata bahasa</strong>: Bagian ini mengukur kemampuan peserta tes untuk memahami dan menentukan penggunaan tata bahasa dan struktur yang tepat dalam bahasa Inggris tertulis standar.</p></li><li><p><strong>Keterampilan membaca</strong>: Bagian ini mengukur kemampuan peserta tes untuk membaca dan memahami teks bahasa Inggris serta kosakata secara kontekstual dalam teks yang disediakan.</p></li></ol><img class="mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&amp;w=1770&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="computer" title="computer"><p>Sertifikat PTESOL dapat digunakan (dan telah digunakan) untuk berbagai tujuan, seperti:</p><ul><li><p>Tes penempatan bagi peserta program pelatihan bahasa Inggris di UPI Language Center;</p></li><li><p>Untuk memantau kemajuan peserta yang mengikuti program pelatihan bahasa Inggris di UPI Language Center (tes kemajuan);</p></li><li><p>Tes keluar untuk mahasiswa di semua tingkat (sarjana, magister, dan doktoral) UPI.</p></li><li><p>Persyaratan tes seleksi bagi pelamar pegawai negeri sipil.</p></li><li><p>Persyaratan masuk untuk studi lanjut.</p></li><li><p>Serdos (Sertifikasi Dosen).</p></li></ul><p>UPI Language Center menawarkan layanan pengujian PTESOL kepada seluruh anggota staf akademik UPI dan masyarakat umum. Pengujian PTESOL dapat dilakukan di laboratorium tes UPI Language Center (mode CBT) atau, atas permintaan, di lokasi sekolah atau institusi yang bekerja sama (mode kertas dan pensil).</p><p>Brosur PTESOL dapat diunduh <a target="_blank" rel="noopener noreferrer nofollow" href="https://drive.google.com/uc?export=download&amp;id=1tjevqmai7_dhQdZ0sfiA--84XF_WiBYU">di sini</a>.</p>', 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&amp;w=1770&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1720736822, 1720737341, 1720737341);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzr5dhu002uq2e5o86e3hbp', '', '', '', '', '<p></p>', NULL, 1722874956, 1722874960, NULL);
INSERT INTO `himarpl_post` (`authorId`, `title`, `metaTitle`, `slug`, `content`, `raw_html`, `image`, `createdAt`, `updatedAt`, `publishedAt`) VALUES
('clxzqk178001qq2e5t2etwcqr', 'Kok Banyak Orang Terjerat Pinjol', 'kok banyak orang terjerat pinjol', 'kok-banyak-orang-terjerat-pinjol', 'Kenapa Menggunakan Pinjol?\n\nPinjaman online (pinjol) banyak sekali digunakan oleh masyarakat saat ini. Akses yang mudah dan prosesnya yang cepat menjadi alasan kenapa pinjol banyak digunakan. Tapi dibalik kemudahan tersebut ada bahaya terjerat hutang. Ada 18 juta warga yang menjadi peminjam aktif pinjol. Apa saja penyebab orang meminjam ke pinjol?\n\n\n\nFaktor Utama Menggunakan Pinjol\n\nFaktor utama di baliknya adalah kurangnya literasi keuangan, kebutuhan mendesak, gaya hidup konsumtif, kemudahan akses pinjol, dan maraknya penawaran pinjol ilegal. Perpaduan faktor ini mendorong orang untuk meminjam tanpa mempertimbangkan konsekuensi dan kemampuan mereka untuk membayar, sehingga terjerat dalam hutang yang menumpuk dan berdampak negatif pada kehidupan mereka.\n\n\nDampak Menggunakan Pinjol\n\nBeban hutang yang numpuk bisa bikin stres dan depresi. Gak mampu bayar hutang, denda dan bunga terus nambah, bahkan bisa jerat hukum. Parahnya lagi, pinjol ilegal sering pakai cara penagihan gak etis, kayak meneror dan menyebarkan informasi pribadi.\n\nAgar Tidak Terjerat Pinjol\n\nSebelum terjebak hutang menumpuk dan stres, yuk pahami dulu konsep keuangan dasar seperti bunga, tenor, dan biaya pinjol. Pastikan pinjam duit sesuai kemampuan bayar dan gunakan pinjol legal yang terdaftar di OJK. Ingat, pinjol hanya untuk kebutuhan mendesak, bukan gaya hidup konsumtif. Cari solusi lain seperti menabung, cari kerja sampingan, atau minta bantuan keluarga/teman. Bijaklah dalam berpinjam agar terhindar dari jeratan pinjol!', '<img class="mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded" src="https://cdn.jsdelivr.net/gh/padli-septiana/asset-rekapstore@main/kok-banyak-orang-terjerat-pinjol.jpg" alt="image-pinjol" title="image-pinjol"><h3>Kenapa Menggunakan Pinjol?</h3><p>Pinjaman online (pinjol) banyak sekali digunakan oleh masyarakat saat ini. Akses yang mudah dan prosesnya yang cepat menjadi alasan kenapa pinjol banyak digunakan. Tapi dibalik kemudahan tersebut ada bahaya terjerat hutang. Ada 18 juta warga yang menjadi peminjam aktif pinjol. Apa saja penyebab orang meminjam ke pinjol?</p><p></p><h3>Faktor Utama Menggunakan Pinjol</h3><p>Faktor utama di baliknya adalah kurangnya literasi keuangan, kebutuhan mendesak, gaya hidup konsumtif, kemudahan akses pinjol, dan maraknya penawaran pinjol ilegal. Perpaduan faktor ini mendorong orang untuk meminjam tanpa mempertimbangkan konsekuensi dan kemampuan mereka untuk membayar, sehingga terjerat dalam hutang yang menumpuk dan berdampak negatif pada kehidupan mereka.</p><p></p><h3>Dampak Menggunakan Pinjol</h3><p>Beban hutang yang numpuk bisa bikin stres dan depresi. Gak mampu bayar hutang, denda dan bunga terus nambah, bahkan bisa jerat hukum. Parahnya lagi, pinjol ilegal sering pakai cara penagihan gak etis, kayak meneror dan menyebarkan informasi pribadi.</p><h3>Agar Tidak Terjerat Pinjol</h3><p>Sebelum terjebak hutang menumpuk dan stres, yuk pahami dulu konsep keuangan dasar seperti bunga, tenor, dan biaya pinjol. Pastikan pinjam duit sesuai kemampuan bayar dan gunakan pinjol legal yang terdaftar di OJK. Ingat, pinjol hanya untuk kebutuhan mendesak, bukan gaya hidup konsumtif. Cari solusi lain seperti menabung, cari kerja sampingan, atau minta bantuan keluarga/teman. Bijaklah dalam berpinjam agar terhindar dari jeratan pinjol!</p>', 'https://cdn.jsdelivr.net/gh/padli-septiana/asset-rekapstore@main/kok-banyak-orang-terjerat-pinjol.jpg', 1720747786, 1720748338, 1720748338);

-- insert social media data
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxwwgcmq000010ef3m45gkax', 'instagram', 'dikdns', 'https://instagram.com/dikdns');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxykkjf0000emwt20orvour8', 'instagram', 'annisaa.isn', 'https://instagram.com/annisaa.isn');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxwwgcmq000010ef3m45gkax', 'github', 'dikdns', 'https://github.com/dikdns');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxy7pksx0005khky4kam017x', 'instagram', 'himarpl', 'https://instagram.com/himarpl');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxy7pksx0005khky4kam017x', 'github', 'himarpl', 'https://github.com/himarpl');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqk178001qq2e5t2etwcqr', 'instagram', 'septian_padli', 'https://instagram.com/septian_padli');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqk178001qq2e5t2etwcqr', 'github', 'septian_padli', 'https://github.com/septian_padli');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzpwin3000uq2e547kq6fnw', 'github', 'interstellardeer', 'https://github.com/interstellardeer');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqkej3001sq2e5s212jx6d', 'instagram', 'raf.zz_', 'https://instagram.com/raf.zz_');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqkej3001sq2e5s212jx6d', 'github', 'Zreaei', 'https://github.com/Zreaei');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzpzw7a0010q2e5c75hhkhv', 'instagram', 'aruleyd', 'https://instagram.com/aruleyd');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzpzw7a0010q2e5c75hhkhv', 'github', 'CRXWFF', 'https://github.com/CRXWFF');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzpkwmq000fq2e5c4d1d8d0', 'instagram', 'maryamsilva_', 'https://instagram.com/maryamsilva_');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxyluupb0000ysh8oigss2cl', 'instagram', 'tsaqiebabdanes', 'https://instagram.com/tsaqiebabdanes');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzr5dhu002uq2e5o86e3hbp', 'instagram', 'fayrabbani', 'https://instagram.com/fayrabbani');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzq4qog0012q2e5j5amdg6o', 'instagram', 'fulviandafa', 'https://instagram.com/fulviandafa');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzr7yyd0036q2e5ppl78cen', 'instagram', 'https://www.instagram.com/restu_tea345?igsh=ZHlza3hsM2V4YnNx', 'https://instagram.com/https://www.instagram.com/restu_tea345?igsh=ZHlza3hsM2V4YnNx');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqwo9i002aq2e5uqc8npzl', 'instagram', 'https://www.instagram.com/chann_mukti/', 'https://instagram.com/https://www.instagram.com/chann_mukti/');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqwo9i002aq2e5uqc8npzl', 'github', 'https://github.com/ChandraMukti022', 'https://github.com/https://github.com/ChandraMukti022');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqj3oy001mq2e5774cithr', 'instagram', '@rucitafirli', 'https://instagram.com/@rucitafirli');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzr3ejp002oq2e51ihgd8f5', 'instagram', 'achmdsoewrdi', 'https://instagram.com/achmdsoewrdi');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzq72230014q2e52mdqtygk', 'instagram', 'npc_bam', 'https://instagram.com/npc_bam');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqs3nv0022q2e5p8kom5qu', 'instagram', 'rafnazhm', 'https://instagram.com/rafnazhm');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqs3nv0022q2e5p8kom5qu', 'github', 'rafinazhminugraha', 'https://github.com/rafinazhminugraha');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzppwyx000mq2e5p1285mr7', 'instagram', 'rstisbil_', 'https://instagram.com/rstisbil_');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzppwyx000mq2e5p1285mr7', 'github', 'rstisbil15', 'https://github.com/rstisbil15');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzszljn00074yis1us8evcd', 'instagram', 'ramandha_putras', 'https://instagram.com/ramandha_putras');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzszljn00074yis1us8evcd', 'github', 'ramaGitScholar', 'https://github.com/ramaGitScholar');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzq8hc5001aq2e56h6mwcbl', 'instagram', '@vinaniii', 'https://instagram.com/@vinaniii');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzq8hc5001aq2e56h6mwcbl', 'github', 'vinanui', 'https://github.com/vinanui');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqla04001wq2e5amy812f4', 'instagram', 'ayass1155', 'https://instagram.com/ayass1155');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqla04001wq2e5amy812f4', 'github', 'Laras Januapuspa', 'https://github.com/Laras Januapuspa');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzp7e4u0009q2e5lirgh4ic', 'instagram', 'lifeofjanzani', 'https://instagram.com/lifeofjanzani');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzr6a0f002yq2e5mclg9llr', 'instagram', 'firdanumaras', 'https://instagram.com/firdanumaras');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzr6a0f002yq2e5mclg9llr', 'github', '@Firdan16', 'https://github.com/@Firdan16');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxzqt3y10026q2e5hluhltzc', 'instagram', 'browicakmen', 'https://instagram.com/browicakmen');
INSERT INTO `himarpl_social_media` (`userId`, `name`, `username`, `url`) VALUES
('clxykm4jo000gmwt2i52qkfqq', 'instagram', 'nur.ftrn', 'https://instagram.com/nur.ftrn');


-- Insert user data into himarpl_user table

INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxwwgcmq000010ef3m45gkax', 'Andika Eka Kurnia', 'andika.eka.kurnia@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/kominfo-2.png', 'dikdns', 'Berawal dari seneng main Lego sampe seneng ngoprek komputer (saat ini berkutat di lingkup Typescript dengan React)', 'admin', 1702550536, 1719489891, 1702550536);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxy7pksx0005khky4kam017x', 'HIMARPL', 'himarpl@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@main/images/logo/logo-himarpl-dark.jpg', 'himarpl', NULL, 'admin', 1721439286, 1719562063, 1721439286);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxykkjf0000emwt20orvour8', 'Annisa Isnaini Tsaniya', 'annisa.isn@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-kominfo.png', 'annisaisnaini', '', 'admin', 1721074918, 1719581263, 1721074918);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxykm4jo000gmwt2i52qkfqq', 'Nur Fitriani', 'nur.fitri@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/kominfo-3.png', 'nur-fitriani', NULL, 'admin', 1736111326, 1719581337, 1736111326);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxyluupb0000ysh8oigss2cl', 'Tsaqib Abdan Syakura', 'tsaqibabdan.35@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/kominfo-5.png', 'tsaqib-abdan-syakura', NULL, 'admin', 1722718850, 1719583424, 1722718850);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxylwn9g0002ysh83xenmcgw', 'Muhammad Rafie Afkar Yunansyah', 'rafieafkar@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/kominfo-1.png', NULL, NULL, 'admin', 1720133317, 1719583508, 1720133317);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzp377z0005q2e58lsxn9jo', 'Andhika Pangestu', 'andhikapangestu@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua.png', NULL, NULL, 'member', NULL, 1719668518, 1719668518);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzp4n8v0007q2e533jhqrmg', 'Muhamad Yanuar Alfaridzi ', 'muhamadyanuar@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/kominfo-4.png', NULL, NULL, 'admin', NULL, 1719668586, 1719670503);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzp7e4u0009q2e5lirgh4ic', 'Muhammad Rifky Janzani', 'rjanzaniii@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/wakil.png', 'janzaniii', NULL, 'member', 1723132349, 1719668714, 1723132349);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzp9hlo000bq2e5jusfzxgd', 'Ciranita Kanaka Suryadinata Santamanggala', 'ciranita@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.2.0/images/users/be/sekre.png', 'cira', NULL, 'member', 1723313369, 1719668812, 1723313369);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpc7tb000dq2e52dydzqqh', 'Amanda Jayanti Mulyana', 'amanda1601@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.2.0/images/users/be/bendahara.png', NULL, NULL, 'member', NULL, 1719668939, 1719669743);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpkwmq000fq2e5c4d1d8d0', 'Maryam Silva Rahayu', 'maryamsilva@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-adkes.png', 'maryamsilva', NULL, 'member', 1722832616, 1719669345, 1722832616);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpm599000gq2e5ocn63cbq', "Adwa' Allifah Safwan", 'adwallsaf.17@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/adkes-1.png', NULL, NULL, 'member', NULL, 1719669402, 1719669435);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpo2g3000iq2e5ugn5sa9z', 'Rahma Dina Ariyanti', 'rahmadnaa33@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/adkes-2.png', 'rahmadinaar', NULL, 'member', 1722744852, 1719669492, 1722744852);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpp9c1000kq2e5xcmiqxmx', 'Rifiani Tasrifin', 'rifianitsrfn@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-keuangan.png', NULL, NULL, 'member', NULL, 1719669548, 1719669548);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzppwyx000mq2e5p1285mr7', 'Risti Sabila', 'ristisabila@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/keuangan-1.png', 'ristisabila', NULL, 'member', 1723194175, 1719669578, 1723194175);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpqs0p000oq2e5ps01rbkn', 'Nidda Adzkya Nurfitria', 'adzkyyaan1@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/keuangan-2.png', NULL, NULL, 'member', NULL, 1719669619, 1719669619);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzprkn4000qq2e5r2e719oa', 'Akfal Shamid Yunantara', 'akfaltara@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-psdo.png', 'akfalshamid', NULL, 'member', 1722984654, 1719669656, 1722984654);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzps7oy000sq2e5fbqkk5j5', 'Shaehyan Samukti', 'shaehyansamukti@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/psdo-1.png', 'siehan', NULL, 'member', 1723125219, 1719669686, 1723125219);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpwin3000uq2e547kq6fnw', 'Mochammad Arsya Akhtiar Permana', 'arsya@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/psdo-2.png', 'arsya-permana', '', 'member', 1720899671, 1719669886, 1720899671);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpx2z0000wq2e5gnfgehhx', 'Naila Melany', 'nailamelany.16@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/psdo-3.png', NULL, NULL, 'member', NULL, 1719669913, 1719669913);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpypof000yq2e52i76cud7', 'Syahrul Ramadhan', 'belumada@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/psdo-4.png', NULL, NULL, 'member', NULL, 1719670049, 1719670049);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzpzw7a0010q2e5c75hhkhv', 'Muhammad Nashirul Haq Resa', 'nashirulhaqresa@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/psdo-5.png', 'aruleyd', NULL, 'member', 1727493540, 1719670164, 1727493540);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzq4qog0012q2e5j5amdg6o', 'Mochammad Fulvian Dafa Pranaja ', 'fulvian.dafa23@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-ppm.png', 'fulviandafa', NULL, 'member', 1721095836, 1719670270, 1721095836);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzq72230014q2e52mdqtygk', 'Banu Arief Muzaki', 'banuariefmuzaki30@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ppm-1.png', 'banuariefm', NULL, 'member', 1722752623, 1719670378, 1722752623);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzq7h2j0016q2e551kjkzxs', 'Daniel Hulio Saptianus ', 'danielhs8@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ppm-2.png', NULL, NULL, 'member', NULL, 1719670397, 1719670397);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzq7wq10018q2e5ruv9s4rs', 'Nasywa Rofifah', 'nasywarofifah@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ppm-3.png', NULL, NULL, 'member', NULL, 1719670418, 1719670418);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzq8hc5001aq2e56h6mwcbl', 'Vina Nurul Izzati', 'vinanurul@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ppm-4.png', 'vinanurul', NULL, 'member', 1722793516, 1719670444, 1722793516);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqdlnr001cq2e5tie68x7s', 'Rully Bagja Abdurahman Assides', 'reallybagjaa@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-pd.png', NULL, NULL, 'member', NULL, 1719670683, 1719670683);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqfzdv001eq2e58b1xbvgb', 'Muhamad Trias Firmansyah', 'trias_f@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/pd-1.png', 'trias', NULL, 'member', 1722989322, 1719670794, 1722989322);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqgt96001gq2e5youyb451', 'Gilang Rizki Pratama', 'gilangrpratama@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/pd-2.png', NULL, NULL, 'member', NULL, 1719670833, 1719670833);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqh867001iq2e52wcy4gea', 'Muhammad Tsaqiif Ash-Shiddiq', 'muhammadtsaqiifash@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/pd-3.png', NULL, NULL, 'member', NULL, 1719670853, 1719670853);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqhl4w001kq2e5xmsrdfmw', 'Kiroman Mahbub Maulana', 'kiromanmaulana@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/pd-4.png', NULL, NULL, 'member', NULL, 1719670869, 1719670869);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqj3oy001mq2e5774cithr', 'Firli Rucita Sundari', 'rucitafirli@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-ekraf.png', 'rucitafirli', 'Akan selalu ada ruang untuk bertumbuh.', 'member', 1725798198, 1719670940, 1725798199);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqjnmk001oq2e518htb4i7', 'Ahmad Deva Tajul Muluk', 'ahmaddevatajulmuluk@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ekraf-1.png', NULL, NULL, 'member', NULL, 1719670966, 1719670966);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqk178001qq2e5t2etwcqr', 'Muhammad Padli Septiana', 'muhammadpadliseptiana@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ekraf-2.png', 'padli-septiana', 'Saya adalah staff ekraf ', 'member', 1723128776, 1719670983, 1723128776);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqkej3001sq2e5s212jx6d', 'Muhammad Rafi Zamzami', 'mrafiz@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ekraf-3.png', 'zamzami', NULL, 'member', 1720921488, 1719670901, 1720921488);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqktlm001uq2e58r5fr809', 'Mutia Yasinta', 'mutiayasinta@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ekraf-4.png', NULL, NULL, 'member', NULL, 1719671020, 1719671020);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqla04001wq2e5amy812f4', 'Laras Januapuspa', 'ayass15@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ekraf-5.png', 'ayass', NULL, 'member', 1722994101, 1719671042, 1722994101);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqr1ag001yq2e5sn89qcnr', 'Bagas Adhi Nugraha', 'bagasnv@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/ketua-advokastra.png', 'bagaszz', NULL, 'member', 1723746603, 1719671310, 1723746603);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqrow20020q2e5xzrsmhqs', 'Roy Subagya Santoso', 'roysubagya@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/advokastra-1.png', NULL, NULL, 'member', NULL, 1719671341, 1719671341);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqs3nv0022q2e5p8kom5qu', 'Rafi Nazhmi Nugraha', 'rafinazhminugraha@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/advokastra-2.png', 'rafnazhm', NULL, 'member', 1722746450, 1719671360, 1722746450);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqsmq90024q2e5exv8ray9', 'Muhammad Ali Nur Rohman', 'm.alinurrohman10@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/advokastra-3.png', NULL, NULL, 'member', 1723406631, 1719671385, 1723406631);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqt3y10026q2e5hluhltzc', 'Haryo Wicaksono', 'haryowicaksono@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/be/advokastra-4.png', 'wicakmen', NULL, 'member', 1729114927, 1719671407, 1729114927);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqv8bm0028q2e5espsttlf', 'Nauval Gymnasti', 'nauvalgymnasti@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/ketua.png', 'nauvalgymnasti', NULL, 'member', 1721263904, 1719671506, 1721263904);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqwo9i002aq2e5uqc8npzl', 'Chandra Mukti Gimnastiyar', 'chandramukti022@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/wakil.png', 'kodokhuman', NULL, 'member', 1721624743, 1719671573, 1721624743);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqxt44002cq2e5sgvutnsf', 'Nadia Aqmarina Ghaisany', 'nadiaag1864@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/sekretaris-1.png', NULL, NULL, 'member', NULL, 1719671626, 1719671626);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqyb88002eq2e5jszavusj', 'Elgy Sundari', 'elgysundari@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/sekretaris-2.png', NULL, NULL, 'member', 1722757677, 1719671650, 1722757677);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqz95l002gq2e5pr4dvaqd', 'Sofiatu Zahra Khalifah', 'sofiatuzzz15@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/bendahara-1.png', NULL, NULL, 'member', NULL, 1719671694, 1719671694);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzqzt2u002iq2e5wlqakogy', 'Nurul Fauziyah Arifin', 'nurulfauziyah775@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/bendahara-2.png', NULL, NULL, 'member', NULL, 1719671719, 1719671719);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr1wpu002kq2e53m1439xd', 'Rafa Gyiza Rashieka', 'rafargr@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/ketua-baleg.png', NULL, NULL, 'member', NULL, 1719671817, 1719671817);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr2h1y002mq2e586faautr', 'Hendrata Dewabrata', 'dewabrata155@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/baleg-1.png', NULL, NULL, 'member', NULL, 1719671844, 1719671844);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr3ejp002oq2e51ihgd8f5', 'Achmad Soewardi', 'achmadsoewardi@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/baleg-2.png', 'soe', NULL, 'member', 1722747722, 1719671887, 1722747722);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr44iw002qq2e5zumxi4co', 'Lusi Alifatul Laila', 'lusialifatul03@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/baleg-3.png', NULL, NULL, 'member', NULL, 1719671921, 1719671921);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr4ip6002sq2e51gl7j7iv', 'Zidan Dwi Permana ', 'zidandwipermana@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/baleg-4.png', 'zixuan', NULL, 'member', 1721081922, 1719671939, 1721081922);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr5dhu002uq2e5o86e3hbp', 'Muhammad Fayyadh Rabbani', 'fayyadhrabbani@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/ketua-komisi.png', 'fayrabbani', NULL, 'member', 1722749746, 1719671979, 1722749746);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr5uek002wq2e592t63xqo', 'Davin Ghani Ananta Kusuma', 'ghaniananta@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-1.png', NULL, NULL, 'member', NULL, 1719672001, 1719672001);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr6a0f002yq2e5mclg9llr', 'Firdan Umar Arisyawal', 'firdanumar@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-2.png', 'firdan-umar', NULL, 'member', 1729108965, 1719672021, 1729108965);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr6sv30030q2e545hhvaqu', 'Asep Nadhirin', 'asepnadh@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-3.png', 'https://blog.himarpl.com/@asyep', NULL, 'member', 1723986760, 1719672046, 1723986760);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr761m0032q2e51aqfimrp', 'Sarah Nindya Pramesthi', 'sarahpramesthi@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-7.png', NULL, NULL, 'member', NULL, 1719672063, 1719674422);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr7iu50034q2e5x35rxcvx', 'Fakhri Rossi', 'fakhri.rossi@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-5.png', NULL, NULL, 'member', NULL, 1719672079, 1719672079);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr7yyd0036q2e5ppl78cen', 'Restu Utami', 'restut@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-6.png', 'restutea', '', 'member', 1721082163, 1719672100, 1721082163);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr8cqb0038q2e58p2sa6vl', 'Fadli Mahesa', 'fadlee.mhsa09@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-4.png', NULL, NULL, 'member', NULL, 1719672118, 1719674382);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr8pqe003aq2e5gqfeapwx', 'Septiawan Hadi Prasetyo', 'sptwn26@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-8.png', NULL, NULL, 'member', NULL, 1719672135, 1719672135);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr98j2003cq2e5ti1m31b5', 'Reyhan Putra Syailendra', 'reyhan.putra@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-9.png', NULL, NULL, 'member', NULL, 1719672159, 1719672159);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzr9qg8003eq2e5eu9pbowx', 'Bagoes Eldine Sadewa', 'eldinesadewa7@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/komisi-10.png', NULL, NULL, 'member', NULL, 1719672183, 1719672183);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzsy7cg00014yissujbgo3p', 'Muhamad Fadhly Rafiansyah', 'muhamadfadhly@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/ketua-burta.png', NULL, NULL, 'member', NULL, 1719675004, 1719675119);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzsypve00034yissq4hm941', 'Raihan Nurazhar Budi Satria', 'raihannurazhar@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/burta-1.png', NULL, NULL, 'member', NULL, 1719675028, 1719675028);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzsz5dt00054yisbc62od6g', 'Ahmad Hilman Alhafizh', 'ahmadhilman19@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/burta-2.png', 'alhfizh', NULL, 'member', 1723229106, 1719675048, 1723229106);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzszljn00074yis1us8evcd', 'Ramandha Putra Suryahadi', 'ramandha.putras@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/burta-3.png', 'ramandha_putras', NULL, 'member', 1722749261, 1719675069, 1722749261);
INSERT INTO `himarpl_user` (`id`, `name`, `email`, `email_verified`, `image`, `username`, `bio`, `role`, `last_login_at`, `created_at`, `updated_at`) VALUES
('clxzszxox00094yisasku8mdx', 'Farhan Angga Riyanto', 'farhanangga8900@upi.edu', NULL, 'https://cdn.jsdelivr.net/gh/himarplupi/assets-himarpl@v1.1.0/images/users/dp/burta-4.png', NULL, NULL, 'member', NULL, 1719675085, 1719675085);
