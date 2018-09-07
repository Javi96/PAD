package com.pad.slaythespire;


import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.pranavpandey.android.dynamic.toasts.DynamicToast;

import org.w3c.dom.Text;

import java.util.Objects;


/**
 * A simple {@link Fragment} subclass.
 */
public class HomeFragment extends Fragment implements View.OnClickListener{

    private TextView playerName;
    private TextView npcName;
    private TextView health;
    private TextView gold;
    private LinearLayout layout;
    private Button play;


    private FirebaseAuth firebaseAuth;

    private DatabaseReference database;

    public HomeFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false).getRootView();
        playerName = view.findViewById(R.id.user_name_welcome);
        npcName = view.findViewById(R.id.unit_name);
        health = view.findViewById(R.id.health);
        gold = view.findViewById(R.id.gold);
        play = view.findViewById(R.id.play);
        layout = view.findViewById(R.id.unit_image);
        view.findViewById(R.id.ironclad_icon).setOnClickListener(this);
        view.findViewById(R.id.silent_icon).setOnClickListener(this);
        view.findViewById(R.id.defect_icon).setOnClickListener(this);
        view.findViewById(R.id.play).setOnClickListener(this);
        database = FirebaseDatabase.getInstance().getReference();


        Query query = FirebaseDatabase.getInstance().getReference().child("users").child(FirebaseAuth.getInstance().getUid());
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    for (DataSnapshot field : dataSnapshot.getChildren()) {
                        switch (field.getKey()){
                            case "name":
                                playerName.setText("Welcome "+ field.getValue().toString());
                                break;
                        }

                    }
                }else{
                    playerName.setText("Welcome "+ firebaseAuth.getCurrentUser().getDisplayName().toString());
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
        firebaseAuth = FirebaseAuth.getInstance();
        return view;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.ironclad_icon:
                npcName.setText(R.string.ironclad_name);
                health.setText(R.string.ironclad_health);
                gold.setText(R.string.ironclad_gold);
                play.setClickable(true);
                play.setAlpha(1F);
                layout.setBackground(ContextCompat.getDrawable(Objects.requireNonNull(getContext()), R.drawable.ironclad_big));
                break;
            case R.id.silent_icon:
                npcName.setText(R.string.silent_name);
                health.setText(R.string.silent_health);
                gold.setText(R.string.silent_gold);
                play.setClickable(false);
                play.setAlpha(0.5F);
                layout.setBackground(ContextCompat.getDrawable(Objects.requireNonNull(getContext()), R.drawable.silent_big));
                break;
            case R.id.defect_icon:
                npcName.setText(R.string.defect_name);
                health.setText(R.string.defect_health);
                gold.setText(R.string.defect_gold);
                play.setAlpha(0.5F);
                play.setClickable(false);
                layout.setBackground(ContextCompat.getDrawable(Objects.requireNonNull(getContext()), R.drawable.defect_big));
                break;
            case R.id.play:
                Intent intent = new Intent(getActivity(), GameActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            default:
                break;
        }
    }
}
