package fi.exadeci.infrakit.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MetadataEntry {

	@Id @GeneratedValue
	private long MetadataEntryId;
	
	@Column
	private String key;
	
	@Column
	private String stringValue;
	
	@Column
	private long integerValue;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="metadataId")
	private Metadata metadata;
	
	private MetadataEntry() {
		
	}
	
	public static MetadataEntry create(Metadata metadata, String key, String value) {
		MetadataEntry retval = new MetadataEntry();
		retval.key = key;
		retval.stringValue = value;
		retval.metadata = metadata;
		
		return retval;
	}

	
	public static MetadataEntry create(Metadata metadata, String key, long value) {
		MetadataEntry retval = new MetadataEntry();
		retval.key = key;
		retval.integerValue = value;
		retval.metadata = metadata;
		
		return retval;
	}

	
	public long getMetadataEntryId() {
		return MetadataEntryId;
	}

	public String getKey() {
		return key;
	}

	public String getStringValue() {
		return stringValue;
	}

	public long getIntegerValue() {
		return integerValue;
	}
	
	
	
}
