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

--
-- Name: tojson(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.tojson()
    LANGUAGE sql
    AS $$COPY (
  SELECT json_agg(jsonb_build_object(
    'proizvođači', to_jsonb(p),
    'automobili', (
      SELECT json_agg(to_jsonb(a))
      FROM automobili a
      WHERE a.proizvođač_id = p.id
    )
  ))
  FROM proizvođači p
) TO 'C:\Users\Public\Proba\test.json';$$;


ALTER PROCEDURE public.tojson() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: automobili; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.automobili (
    id integer NOT NULL,
    model character varying(255),
    godina_proizvodnje integer,
    motor character varying(255),
    snaga_motora integer,
    vrsta_goriva character varying(255),
    broj_vrata integer,
    cijena numeric(10,2),
    "težina_vozila" numeric(10,2),
    boje_id character varying(255),
    marka character varying(255)
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
-- Name: boje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boje (
    id integer NOT NULL,
    naziv character varying(50)
);


ALTER TABLE public.boje OWNER TO postgres;

--
-- Name: boje_automobila_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boje_automobila_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boje_automobila_id_seq OWNER TO postgres;

--
-- Name: automobili id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili ALTER COLUMN id SET DEFAULT nextval('public.automobili_id_seq'::regclass);


--
-- Data for Name: automobili; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.automobili (id, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, "težina_vozila", boje_id, marka) FROM stdin;
100	Corolla	2022	2.0L I4	168	Benzin	4	25000.00	1300.00	1,2	Toyota
101	Fiesta	2021	1.6L I4	120	Benzin	4	18000.00	1100.00	2,3	Ford
102	Accord	2022	2.0L I4	192	Benzin	4	27000.00	1400.00	3,4	Honda
103	3 Series	2021	2.0L I4	255	Benzin	4	35000.00	1500.00	4,5	BMW
104	Passat	2023	1.8L I4	174	Benzin	4	28000.00	1600.00	5,1	Volkswagen
105	Rav4	2022	2.5L I4	203	Benzin	4	29000.00	1400.00	1,3	Toyota
106	Explorer	2022	3.0L V6	300	Benzin	5	40000.00	1800.00	2,4	Ford
107	Civic	2023	1.5L I4	174	Benzin	4	27000.00	1200.00	3,5	Honda
108	X7	2023	3.0L Inline-6	335	Dizel	5	55000.00	2100.00	4,1	BMW
109	Jetta	2022	1.4L I4	147	Benzin	4	22000.00	1300.00	5,2	Volkswagen
\.


--
-- Data for Name: boje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boje (id, naziv) FROM stdin;
1	Plava
2	Zelena
3	Crvena
4	Crna
5	Bijela
\.


--
-- Name: automobili_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.automobili_id_seq', 112, true);


--
-- Name: boje_automobila_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boje_automobila_id_seq', 20, true);


--
-- Name: automobili automobili_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automobili
    ADD CONSTRAINT automobili_pkey PRIMARY KEY (id);


--
-- Name: boje boje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boje
    ADD CONSTRAINT boje_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

