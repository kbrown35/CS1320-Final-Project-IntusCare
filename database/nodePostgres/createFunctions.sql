CREATE OR REPLACE FUNCTION update_acuities_scores() RETURNS TRIGGER AS
$BODY$
BEGIN
DELETE FROM acuities WHERE form_id = NEW.form_id;
INSERT INTO acuities(
  form_id, patient_id, assessor_id, date_submitted, score_p1, score_p2, 
  score_p3, score_p4, score_p5, score_total)

  SELECT NEW.form_id, NEW.patient_id, NEW.assessor_id, NEW.created_on,

    CASE WHEN NEW."1_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."1_2" = 'yes' THEN 1 * 2 ELSE  0 END        
    + CASE WHEN NEW."1_3" = 'yes' THEN 1 * 2 ELSE  0 END        
    + CASE WHEN NEW."1_4" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."1_5" = 'yes' THEN 1 * 1 ELSE  0 END   
    + CASE WHEN NEW."1_6" = 'yes' THEN 1 * 1 ELSE  0 END 
    , 

    CASE WHEN NEW."2_1" = 'yes' THEN 1 * 2 ELSE  0 END 
    + CASE WHEN NEW."2_2" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."2_3" = 'yes' THEN 1 * 2 ELSE  0 END     
    + CASE WHEN NEW."2_4" = 'yes' THEN 1 * 2 ELSE  0 END     
    + CASE WHEN NEW."2_5" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."2_6" = 'yes' THEN 1 * 2 ELSE  0 END    
    ,

    CASE WHEN NEW."3_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."3_2" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."3_3" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."3_4" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."3_5" = 'yes' THEN 1 * 1 ELSE  0 END     
    + CASE WHEN NEW."3_6" = 'yes' THEN 1 * 2 ELSE  0 END     
    ,

    CASE WHEN NEW."4_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."4_2" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."4_3" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."4_4" = 'yes' THEN 1 * 1 ELSE  0 END  
    ,
    
    CASE WHEN NEW."5_1" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."5_2" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."5_3" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."5_4" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."5_5" = 'yes' THEN 1 * 1 ELSE  0 END   
    ,


    CASE WHEN NEW."1_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."1_2" = 'yes' THEN 1 * 2 ELSE  0 END        
    + CASE WHEN NEW."1_3" = 'yes' THEN 1 * 2 ELSE  0 END        
    + CASE WHEN NEW."1_4" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."1_5" = 'yes' THEN 1 * 1 ELSE  0 END   
    + CASE WHEN NEW."1_6" = 'yes' THEN 1 * 1 ELSE  0 END

    + CASE WHEN NEW."2_1" = 'yes' THEN 1 * 2 ELSE  0 END 
    + CASE WHEN NEW."2_2" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."2_3" = 'yes' THEN 1 * 2 ELSE  0 END     
    + CASE WHEN NEW."2_4" = 'yes' THEN 1 * 2 ELSE  0 END     
    + CASE WHEN NEW."2_5" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."2_6" = 'yes' THEN 1 * 2 ELSE  0 END

    + CASE WHEN NEW."3_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."3_2" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."3_3" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."3_4" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."3_5" = 'yes' THEN 1 * 1 ELSE  0 END     
    + CASE WHEN NEW."3_6" = 'yes' THEN 1 * 2 ELSE  0 END

    + CASE WHEN NEW."4_1" = 'yes' THEN 1 * 2 ELSE  0 END   
    + CASE WHEN NEW."4_2" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."4_3" = 'yes' THEN 1 * 2 ELSE  0 END  
    + CASE WHEN NEW."4_4" = 'yes' THEN 1 * 1 ELSE  0 END

    + CASE WHEN NEW."5_1" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."5_2" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."5_3" = 'yes' THEN 1 * 1 ELSE  0 END    
    + CASE WHEN NEW."5_4" = 'yes' THEN 1 * 2 ELSE  0 END    
    + CASE WHEN NEW."5_5" = 'yes' THEN 1 * 1 ELSE  0 END;

  return NEW;
END; 
$BODY$ 
language plpgsql; 


CREATE TRIGGER acuities_scores_trigger AFTER INSERT OR UPDATE ON form_data
    FOR EACH ROW EXECUTE PROCEDURE update_acuities_scores();



CREATE OR REPLACE FUNCTION update_acuities_risk() RETURNS TRIGGER AS
$BODY$
BEGIN
  NEW.risk := CASE WHEN NEW.score_total <= 9 THEN 'low'
      WHEN NEW.score_total between 10 and 19 then 'moderate'
      WHEN NEW.score_total between 20 and 34 then 'high'
      WHEN new.score_total >= 35 then 'very high'
    END;
  RETURN NEW;
END;
$BODY$
language plpgsql;

CREATE TRIGGER acuities_risk_trigger BEFORE INSERT ON acuities
    FOR EACH ROW EXECUTE PROCEDURE update_acuities_risk();