CREATE OR REPLACE FUNCTION my_func()
RETURNS TABLE(id INT, fname VARCHAR(128), lname VARCHAR(128)) AS
$func$
BEGIN
   RETURN QUERY SELECT mp.id, mp.fname, mp.lname FROM myapp_person AS mp;
END
$func$  LANGUAGE plpgsql;
