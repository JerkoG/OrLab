--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: automobili; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.automobili (
    id integer NOT NULL,
    "proizvođač_id" integer,
    model character varying(255),
    godina_proizvodnje integer,
    boja character varying(255),
    motor character varying(255),
    snaga_motora integer,
    vrsta_goriva character varying(255),
    broj_vrata integer,
    cijena numeric(10,2),
    "težina_vozila" numeric(10,2),
    proizvodac_id integer
);


ALTER TABLE public.automobili OWNER TO postgres;

--
-- Name: automobili_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.automobili_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.automobili_id_seq OWNER TO postgres;

--
-- Name: automobili_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.automobili_id_seq OWNED BY public.automobili.id;


--
-- Name: proizvođači; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."proizvođači" (
    id integer NOT NULL,
    "naziv_proizvođača" character varying(255),
    "sjedište_proizvođača" character varying(255)
);


ALTER TABLE public."proizvođači" OWNER TO postgres;

--
-- Name: proizvođači_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."proizvođači_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."proizvođači_id_seq" OWNER TO postgres;

--
-- Name: proizvođači_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."proizvođači_id_seq" OWNED BY public."proizvođači".id;


--
-- Name: automobili id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili ALTER COLUMN id SET DEFAULT nextval('public.automobili_id_seq'::regclass);


--
-- Name: proizvođači id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."proizvođači" ALTER COLUMN id SET DEFAULT nextval('public."proizvođači_id_seq"'::regclass);


--
-- Data for Name: automobili; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.automobili (id, "proizvođač_id", model, godina_proizvodnje, boja, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, "težina_vozila", proizvodac_id) FROM stdin;
100	1	Corolla	2022	Siva	2.0L I4	168	Benzin	4	25000.00	1300.00	\N
101	2	Fiesta	2021	Crvena	1.6L I4	120	Benzin	4	18000.00	1100.00	\N
102	3	Accord	2022	Plava	2.0L I4	192	Benzin	4	27000.00	1400.00	\N
103	4	3 Series	2021	Crna	2.0L I4	255	Benzin	4	35000.00	1500.00	\N
104	5	Passat	2023	Bijela	1.8L I4	174	Benzin	4	28000.00	1600.00	\N
105	1	Rav4	2022	Siva	2.5L I4	203	Benzin	4	29000.00	1400.00	\N
106	2	Explorer	2022	Crvena	3.0L V6	300	Benzin	5	40000.00	1800.00	\N
107	3	Civic	2023	Plava	1.5L I4	174	Benzin	4	27000.00	1200.00	\N
108	4	X7	2023	Crna	3.0L Inline-6	335	Dizel	5	55000.00	2100.00	\N
109	5	Jetta	2022	Bijela	1.4L I4	147	Benzin	4	22000.00	1300.00	\N
\.


--
-- Data for Name: proizvođači; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."proizvođači" (id, "naziv_proizvođača", "sjedište_proizvođača") FROM stdin;
1	Toyota	Toyota City, Japan
2	Ford	Dearborn, Michigan, SAD
3	Honda	Tokyo, Japan
4	BMW	Munich, Njemačka
5	Volkswagen	Wolfsburg, Njemačka
\.


--
-- Name: automobili_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.automobili_id_seq', 109, true);


--
-- Name: proizvođači_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."proizvođači_id_seq"', 5, true);


--
-- Name: automobili automobili_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili
    ADD CONSTRAINT automobili_pkey PRIMARY KEY (id);


--
-- Name: proizvođači proizvođači_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."proizvođači"
    ADD CONSTRAINT "proizvođači_pkey" PRIMARY KEY (id);


--
-- Name: automobili automobili_proizvođač_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili
    ADD CONSTRAINT "automobili_proizvođač_id_fkey" FOREIGN KEY ("proizvođač_id") REFERENCES public."proizvođači"(id);


--
-- Name: automobili fk_proizvodac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili
    ADD CONSTRAINT fk_proizvodac FOREIGN KEY (proizvodac_id) REFERENCES public."proizvođači"(id);


--
-- PostgreSQL database dump complete
--

